class PositionsController < ApplicationController
  before_action :set_position, only: [:destroy, :update, :suitable, :offers, :send_offer, :make_deal]
  before_action :set_serialized_position, only: [:show, :edit]
  before_action :set_deal, only: [:receiving, :shipping]
  before_action :check_user, except: [:show, :index]
  before_action :check_owner, only: [:destroy, :update, :edit, :make_deal]

  def index
    respond_to do |format|
      format.html
      format.json {
        if params[:ids]
          @positions = Position.where(id: params[:ids]).distinct.pluck_fields
          render json: Oj.dump({collection: @positions})
        else
          check_user
          if params[:type] == 'Position'
            current_user.update(new_offers_count: 0) if current_user.new_offers_count != 0
          end
          
          plural_name = params[:type].downcase.pluralize.to_sym rescue :positions
          @positions = current_user.send("#{plural_name}_from_cache", params.permit![params[:type]])

          counters = current_user.send(plural_name).group(:status).count
          render json: Oj.dump({collection: @positions, counters: counters})
        end
      }
    end
  end

  def counters
    counters = current_user.positions.group(:status).count
    render json: Oj.dump(counters)
  end

  def new
    respond_to do |format|
      format.html
      format.json {
        @position = serialize(Position.new)
        render json: Oj.dump(@position)
      }
    end
  end

  def edit
    respond_to do |format|
      format.html
      format.json {
        render json: Oj.dump(@position)
      }
    end
  end

  def destroy

  end

  def create
    respond_to do |format|
      format.json {
        @position = current_user.positions.new position_params
        if @position.save
          if params[:position][:save_as_template]
            current_user.templates.create position_params.update(template_name: params[:position][:template_name])
          end
          render json: {msg: "Позиция успешно создана", redirect_to: "positions_path"}
        else
          render json: {errors: @position.errors}, status: 422
        end
      }
    end
  end

  def update
    respond_to do |format|
      format.json {
        if @position.update(position_params)
          render json: {msg: "Позиция успешно изменена", redirect_to: "positions_path"}
        else
          render json: {errors: @position.errors}, status: 422
        end
      }
    end
  end

  def show
    respond_to do |format|
      format.json {
        render json: Oj.dump(@position)
      }
    end
  end

  def suitable
    respond_to do |format|
      format.json {
        @positions = Rails.cache.fetch([@position, current_user.positions_from_cache]) do
          offers = @position.offers.where(user_id: current_user.id, status: "active")
          have_offer = offers.first
          positions = if have_offer
            [have_offer]
          else
            Position.find_suitable(@position.id).where(user_id: current_user.id).where.not(id: offers.pluck(:from_position_id))
          end
          serialize(positions, serializer: PositionSerializer)
        end
        render json: Oj.dump(@positions)
      }
    end
  end

  def offers
    respond_to do |format|
      format.json {
        @offers = @position.offers_from_cache(status: "active")
        render json: Oj.dump(@offers)
      }
    end
  end

  def send_offer
    respond_to do |format|
      format.json {
        have_offer = @position.offers.where(user_id: current_user.id, status: "active").first
        if have_offer
          render json: {msg: "Вы уже отправляли предожение по данной позиции. Вы можете отредактировать его."}, status: 422
        else
          @offer = Position.find_from_cache(params[:offer_id]).to_offer
          @position.offers << @offer
          if @offer.valid?
            render json: {msg: "Предложение успешно отправлено!", offer: serialize(@offer)}
          else
            render json: {msg: @offer.errors.full_messages.joins(', ')}, status: 422
          end
        end
      }
    end
  end

  def toggle_favorite
    respond_to do |format|
      format.json {
        id = params[:id].to_i
        query = {user_id: current_user.id, position_id: id}
        if current_user.favorite_ids.include?(id)
          FavoritePosition.where(query).destroy_all
        else
          FavoritePosition.create(query)
        end
        render json: current_user.favorite_ids
      }
    end
  end

  def make_deal
    respond_to do |format|
      format.json {
        @offer = @position.offers.find params[:offer_id]
        @position.start_process!
        @offer.start_process!
        @position.offers.where.not(id: @offer.id).update_all(status: "rejected")
        @correspondence = CorrespondencePosition.between_positions([@offer.id, @position.id])
        @deal = Deal.create(position_id: @position.id, offer_id: @offer.id, correspondence_id: @correspondence.id)

        @correspondence.messages.create(message_type: "make_deal", body: "Service message", user_id: current_user.id, offer: @offer.pluck_fields)
        render json: {msg: "Сделка успешно заключена", deal: @deal, user: serialize(@offer), my: serialize(@position)}
      }
    end
  end

  def shipping
    respond_to do |format|
      format.json {
        if @position_base.trade_type_id == 2
          @deal.ship!
          @deal.correspondence.messages.create(message_type: "shipping", body: "Service message", user_id: current_user.id)
          render json: {msg: "Отправка подтверждена", deal: @deal}
        else
          render json: {msg: "Неверный тип позиции"}, status: 422
        end
      }
    end
  end

  def receiving
    respond_to do |format|
      format.json {
        if @position_base.trade_type_id == 1
          @deal.receive!
          @my_position.complete!
          @user_position.complete!
          @deal.correspondence.messages.create(message_type: "receiving", body: "Service message", user_id: current_user.id)
          @deal.correspondence.messages.create(message_type: "completed", body: "Service message", user_id: current_user.id)
          render json: {msg: "Получение подтверждено", deal: @deal, my: serialize(@my_position), user: serialize(@user_position)}
        else
          render json: {msg: "Неверный тип позиции"}, status: 422
        end
      }
    end
  end

  private
    def set_serialized_position
      @position = Position.find_from_cache params[:id], serializer: PositionSerializer
    end

    def set_position
      @position = Position.find_from_cache params[:id]
    end

    def set_deal
      @position_base = current_user.position_bases.find(params[:id])
      @deal = @position_base.deal

      if @position_base.type == 'Position'
        @my_position = Position.find_from_cache(params[:id])
        @user_position = Offer.find_from_cache(@my_position.offers.first.id)
      elsif @position_base.type == 'Offer'
        @my_position = Offer.find_from_cache(params[:id])
        @user_position = Position.find_from_cache(@my_position.position.id)
      end
    end

    def check_owner
      if @position["user_id"] != current_user.id
        render json: {msg: "Позиция не найдена", redirect_to: "positions_path"}, status: 404
      end
    end

    def position_params
      params[:position][:images] ||= []
      params[:position][:documents] ||= []

      params.require(:position).permit(
        :title,
        :description,
        :weight,
        :weight_min,
        :price,
        :price_discount,
        :address,
        :trade_type_id,
        :currency_id,
        :price_weight_dimension_id,
        :weight_dimension_id,
        :weight_min_dimension_id,
        :lat,
        :lng
      ).merge({
        option_id: (params[:position][:option][:id] rescue nil),
        image_ids: (params[:position][:images].map{|i| i[:id]} rescue nil),
        document_ids: (params[:position][:documents].map{|i| i[:id]} rescue nil),
      })
    end
end

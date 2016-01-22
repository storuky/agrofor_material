class OffersController < ApplicationController
  before_action :set_offer, only: [:update, :destroy]
  before_action :set_serialized_offer, only: [:show, :edit]
  before_action :check_owner, only: [:update, :destroy]


  def index
    respond_to do |format|
      format.html
      format.json {
        counters = current_user.offers.group(:status).count
        @positions = current_user.offers_from_cache status: params[:status]
        render json: Oj.dump({collection: @positions, counters: counters})
      }
    end
  end

  def create
    respond_to do |format|
      format.json {
        @position = Position.find_from_cache(params[:suitable])
        have_offer = @position.offers.where(user_id: current_user.id, status: "active").first
        if have_offer
          render json: {msg: "Вы уже отправляли предожение по данной позиции. Вы можете отредактировать его."}, status: 422
        else
          @offer = current_user.offers.create offer_params.update(position_id: params[:suitable])
          if @offer.valid?
            render json: {msg: "Предложение успешно отправлено"}
          else
            render json: {errors: @offer.errors, msg: @offer.errors.full_messages.join(', ')}, status: 422
          end
        end
      }
    end
  end

  def update
    respond_to do |format|
      format.json {
        if @offer.update(offer_params)
          render json: {msg: "Предложение успешно изменено"}
        else
          render json: {errors: @offer.errors, msg: @offer.errors.full_messages.join(', ')}, status: 422
        end
      }
    end
  end

  def edit
    respond_to do |format|
      format.html {
        render template: "positions/edit"
      }
      format.json {
        check_owner
        render json: Oj.dump(@offer)
      }
    end
  end

  def new
    respond_to do |format|
      format.html {
        render template: "positions/new"
      }
      format.json {
        @offer = serialize(Position.find_from_cache(params[:suitable]).contractor(currency: current_user.currency))
        render json: Oj.dump(@offer)
      }
    end
  end

  def show
    respond_to do |format|
      format.html
      format.json {
        render json: Oj.dump(@offer)
      }
    end
  end

  def destroy
    respond_to do |format|
      format.json {
        @offer.update(status: "deleted")
        render json: {msg: "Предложение успешно отозвано"}
      }
    end
  end

  def reset_counter
    current_user.update(new_offers_count: 0)
    render json: {}
  end

  private
    def set_offer
      @offer = Offer.find_from_cache params[:id]
    end

    def set_serialized_offer
      @offer = Offer.find_from_cache params[:id], serializer: OfferSerializer
    end

    def check_owner
      if @offer[:user_id] != current_user.id
        render json: {msg: "Предложение не найдено"}, status: 404
      end
    end

    def offer_params
      params.require(:offer).permit(
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
        option_id: (params[:offer][:option][:id] rescue nil),
        image_ids: (params[:offer][:images].map{|i| i[:id]} rescue nil),
        document_ids: (params[:offer][:documents].map{|i| i[:id]} rescue nil),
      })
    end
end

class PositionsController < ApplicationController
  before_action :check_user, except: [:show]
  before_action :set_position, only: [:destroy, :update, :suitable]
  before_action :set_serialized_position, only: [:show, :edit]
  before_action :check_owner, only: [:destroy, :update, :edit]

  def index
    respond_to do |format|
      format.html
      format.json {
        if params[:ids]
          @positions = Position.find_from_cache(params[:ids], serializer: PositionSerializer)
        else
          @positions = User.positions_from_cache current_user.id
        end
        render json: Oj.dump(@positions)
      }
    end
  end

  def new
    respond_to do |format|
      format.html
      format.json {
        if params[:suitable]
          @position = serialize(Position.find_from_cache(params[:suitable]).contractor)
        else
          @position = serialize(Position.new)
        end
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
        @positions =  Position.find_suitable(@position).where(user_id: current_user.id)
        @positions = serialize(@positions)
        render json: Oj.dump(@positions)
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

    def check_owner
      if @position[:user_id] != current_user.id
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

class PositionsController < ApplicationController
  def index

  end

  def new

  end

  def edit

  end

  def show

  end

  def destroy

  end

  def create
    respond_to do |format|
      format.json {
        @position = Position.new position_params
        if @position.save
          render json: {msg: "Позиция успешно создана"}
        else
          render json: {errors: @position.errors, form: :position}, status: 422
        end
      }
    end
  end

  def update

  end

  private
    def position_params
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
      ).merge({
        option_id: (params[:position][:option][:id] rescue nil)
      })
    end
end

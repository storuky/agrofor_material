class TemplatesController < ApplicationController
  before_action :set_template, only: :update
  before_action :set_serialized_template, only: [:show, :edit]
  before_action :check_user
  def index
    respond_to do |format|
      format.json {
        counters = current_user.offers.group(:status).count
        @positions = current_user.templates_from_cache
        global_counters = current_user.position_bases.group(:type).count
        render json: Oj.dump({collection: @positions, counters: counters, global_counters: global_counters})
      }
    end
  end

  def update
    respond_to do |format|
      format.html
      format.json {
        return render json: {msg: "Шаблон не найден", redirect_to: "positions_path"}, status: 404 if @template.user_id != current_user.id
        if @template.update(template_params)
          render json: {msg: "Шаблон успешно отредактирован", redirect_to: "positions_path"}
        else
          render json: {errors: @template.errors, msg: @template.errors.full_messages.join(', ')}, status: 422
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
        render json: Oj.dump(@template)
      }
    end
  end
  private

    def set_template
      @template = Template.find_from_cache params[:id]
    end

    def set_serialized_template
      @template = Template.find_from_cache params[:id], serializer: TemplateSerializer
    end

    def template_params
      params.require(:template).permit(
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
        :lng,
        :template_name
      ).merge({
        option_id: (params[:template][:option][:id] rescue nil),
        image_ids: (params[:template][:images].map{|i| i[:id]} rescue nil),
        document_ids: (params[:template][:documents].map{|i| i[:id]} rescue nil),
      })
    end
end

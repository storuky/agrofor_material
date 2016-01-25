class ApplicationController < ActionController::Base
  include ApplicationHelper
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  serialization_scope :view_context

  helper_method :current_company
  before_action :set_company
  before_action :set_locale
  before_action :user_needed
  before_action :user_valid
  after_action :set_csrf_cookie

  layout proc {
    if request.xhr?
      false
    else
      if current_user
        set_gon
        if current_user.valid?
          'application'
        else
          'fill'
        end
      else
        "landings/#{Company.current_company.name}"
      end
    end
  }

  def counters
    render json: {
      new_messages_count: (current_user.new_messages_count rescue 0),
      new_offers_count: (current_user.new_offers_count rescue 0),
    }
  end

  def serialize res, options = {}
    if res.respond_to?('each')
      serializer = options[:serializer] || "#{res.model_name.name}Serializer".constantize
      ActiveModel::ArraySerializer.new(res, each_serializer: serializer, scope: self, root: false).as_json
    else
      serializer = options[:serializer] || "#{res.model_name.name}Serializer".constantize
      serializer.new(res, scope: self, root: false).as_json
    end
  end

  def cache_if(condition, name = {}, options = nil, &block)
    if condition
      Rails.cache.fetch(name, options, &block)
    else
      yield
    end
  end


  private
    def set_csrf_cookie
      response.headers['X-CSRF-Token'] = form_authenticity_token if protect_against_forgery?
    end

    def user_needed
      unless current_user
        respond_to do |format|
          format.html {
            redirect_to root_path
          }
          format.json {
            render json: {msg: "Вы не авторизованы"}, status: 401
          }
        end
      end
    end

    def user_valid
      if current_user && current_user.invalid?
        respond_to do |format|
          format.html {
            redirect_to fill_path
          }
          format.json {
            render json: {msg: "Вы не заполнили всю информацию о себе"}, status: 401
          }
        end
      end
    end

    def set_locale
      I18n.locale = current_user.language || extract_locale_from_accept_language_header rescue extract_locale_from_accept_language_header
    end

end

class TranslationsController < ApplicationController
  def index
    result = {
      translations: get_translations,
      data: get_data,
      locale: I18n.locale
    }
    render json: Oj.dump(result)
  end
end

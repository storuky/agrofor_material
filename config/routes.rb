Rails.application.routes.draw do
  require 'sidekiq/web'
  mount Sidekiq::Web => '/sidekiq'

  root to: "public#index"
  
  for_routes = ->() do
    get "fill" => "fill#index"

    devise_for :users, controllers: {
          sessions: 'users/sessions',
          registrations: 'users/registrations',
          passwords: 'users/passwords',
          confirmations: 'users/confirmations'
    }

    scope :search, controller: "search" do
      get "map"
      get "list"
      get "my_positions"
    end

    scope :currencies, controller: "currencies" do
      get "currency_rates"
      get "user_currency"
    end

    scope :translations, controller: "translations" do
      get "/" => "translations#index", as: :translations
    end

    scope :correspondences, controller: "correspondences" do
      get 'between_positions'
    end

    scope :images, controller: "images" do
      post 'avatar'
    end


    get "counters" => "application#counters"

    get 'analytics' => 'analytics#index'
    get 'support' => 'support#index'
    get 'help' => 'help#index'
    get 'settings' => 'settings#index'

    resources :images
    resources :documents
    resources :files
    resources :positions
    resources :offers
    resources :favorites
    resources :templates
    resources :correspondences do
      collection do
        delete :reset_counter
      end
      member do
        post :send_message
      end
    end

    resources :offers do
      collection do
        delete :reset_counter
      end
    end
    
    resources :profile do
      member do
        get 'positions'
        get 'feedbacks', is_array: true
      end
    end

    resources :users
    
    resources :positions do
      member do
        get 'suitable', is_array: true
        get 'offers', is_array: true
        put 'send_offer'
        put 'toggle_favorite', is_array: true

        put 'make_deal'
        put 'shipping'
        put 'receiving'
      end
    end
  end

  for_routes.call()
end

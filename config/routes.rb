Rails.application.routes.draw do
  

  root to: "application#index"

  devise_for :users, controllers: {
        sessions: 'users/sessions',
        registrations: 'users/registrations'
  }

  scope :search, controller: "search" do
    get "map"
    get "list"
  end

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
  resources :messages
  resources :correspondences
  resources :offers
  resources :profile do
    member do
      get 'positions', is_array: true
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
    end
  end

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end

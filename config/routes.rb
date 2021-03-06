Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  resources :transactions
  # devise_for :users
  
  resources :tracks
  resources :sound_and_kits
  resources :sounds
  get '/kits/bestsellers', to: 'kits#bestsellers'
  get '/kits/switchSounds', to: 'kits#switchSounds'
  post 'transactions/cart/addToCart', to: 'transactions#addToCart'
  post '/transactions/cart/subtractFromCart', to: 'transactions#subtractFromCart'
  post '/transactions/cart/deleteItemFromCart', to: 'transactions#deleteFromCart'
  get 'transactions/cart/currentCart', to: 'transactions#currentCart'
  post 'transactions/cart/clearCart', to: 'transactions#clearCart'

  # get '/users/sign_in', to: 'kits#design'

  get '/kits/redirect_user', to: 'kits#redirect_user'

  # devise_for :users, skip: :all

  

  devise_for :users, controllers: {
        sessions: 'users/sessions',
        registrations: 'users/registrations'
      }

      devise_scope :user do
        get 'sign_in', to: 'users/sessions#new'
        post 'sign_out', to: 'users/sessions#destroy'
      end

      resources :users

  # devise_for :users: root 'application#index'
  # get 'users/sign_in', to: 'kits#design'

  # devise_for :users, controllers: { sessions: 'users/sessions' }
  # devise_for :users, skip: :all

  # devise_scope :user  do
  #   get 'sign_in', to: 'devise/sessions#new'
  # end

  # get '/kits/getRequest', to: 'kits#getRequest'
  match '/kits/getRequest' => 'kits#getRequest', via: :get

  resources :kits do
    member do
      get 'loadSounds'
    end
  end 

    # get '/', to: 'kits#design'
  root :to => 'kits#design'
  match '/curl_example' => 'request_example#curl_get_example', via: :get
 
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

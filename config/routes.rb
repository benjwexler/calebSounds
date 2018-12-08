Rails.application.routes.draw do
  resources :transactions
  devise_for :users
  resources :users
  resources :tracks
  resources :sound_and_kits
  resources :sounds
  get '/kits/bestsellers', to: 'kits#bestsellers'
  get '/kits/switchSounds', to: 'kits#switchSounds'
  post 'transactions/addToCart', to: 'transactions#addToCart'
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

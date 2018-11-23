Rails.application.routes.draw do
  resources :tracks
  resources :sound_and_kits
  resources :sounds
  get '/kits/bestsellers', to: 'kits#bestsellers'
  resources :kits

    # get '/', to: 'kits#design'
  root :to => 'kits#design'
 
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

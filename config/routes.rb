Rails.application.routes.draw do
  post '/categories', to: "categories#create"
  get '/api/categories', to: "catgories#show"
  
  
  get '/sessions', to: "sessions#show"
  get '/sessions/create'
  get '/sessions/destroy'
  
  post 'api/users/create', to: "users#create"
  # resources :users
  
  get '/', to:"home#index"
  get '*path', to:"home#index"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

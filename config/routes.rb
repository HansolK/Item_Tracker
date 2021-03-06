Rails.application.routes.draw do
  post '/items', to: "items#create"
  put '/api/items/:id', to: "items#edit"
  delete '/api/items/:id', to: "items#destroy"
  get '/api/items', to: "items#index"

  post '/api/categories', to: "categories#create"
  get '/api/categories', to: "categories#index"
  get '/api/categories/:id/items', to: "categories#show"
  delete '/api/categories/:id/delete', to: "categories#destroy"

  
  get '/sessions', to: "sessions#show"
  post '/sessions/create', to:"sessions#create" 
  get '/sessions/destroy'
  
  post '/api/users/create', to: "users#create"
  # resources :users
  
  get '/', to:"home#index"
  get '*path', to:"home#index"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

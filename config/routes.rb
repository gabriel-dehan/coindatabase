Rails.application.routes.draw do
  root to: 'pages#home'
  devise_for :users
  get '/palette', to: 'pages#palette'

  require "sidekiq/web"
  authenticate :user, lambda { |u| u.admin } do
    mount Sidekiq::Web => '/sidekiq'
  end

  resources :coins, only: [:index]

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :coins, only: [:index, :create]
    end
  end
end

Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:index, :show]
    resources :workspaces, only: [:index, :show, :create, :destroy] do
    end
    resource :user, only: [:create]
    resource :session, only: [:create, :destroy, :show]
  end
end

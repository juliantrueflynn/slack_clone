Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:index, :show]
    resources :workspaces, only: [:index, :show, :create, :destroy]
    resource :user, only: [:create]
    resource :session, only: [:create, :destroy, :show]
    resources :channels, only: [:show, :create, :destroy]
    resources :workspace_subs, only: [:create, :destroy]
    resources :channel_subs, only: [:create, :destroy]
    resources :messages, only: [:create, :destroy, :show]
  end

  mount ActionCable.server => '/cable'

  get '*path', to: 'static_pages#index', constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
  root to: 'static_pages#index'
end

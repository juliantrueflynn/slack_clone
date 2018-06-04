Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:index, :show]
    resources :workspaces, only: [:index, :show, :create, :update, :destroy], param: :slug
    resource :user, only: [:create, :update]
    resource :session, only: [:create, :destroy, :show]
    resources :channels, only: [:show, :create, :update, :destroy], param: :slug
    resources :workspace_subs, only: [:create, :destroy]
    resources :channel_subs, only: [:create, :destroy]
    resources :messages, only: [:create, :update, :destroy, :show], param: :slug
    resources :message_favs, only: [:index, :create, :destroy], param: :message_slug
    resources :reactions, only: [:show, :create, :destroy]
  end

  mount ActionCable.server => '/cable'

  get '*path', to: 'static_pages#index', constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

  root to: 'static_pages#index'
end

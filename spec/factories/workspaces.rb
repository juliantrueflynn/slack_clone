FactoryBot.define do
  factory :workspace do
    title { 'Workspace Title' }
    slug { 'workspace_example_slug' }
    association :owner, factory: :user
  end
end

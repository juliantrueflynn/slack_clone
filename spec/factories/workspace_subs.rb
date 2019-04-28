FactoryBot.define do
  factory :workspace_sub do
    user
    workspace
    is_member { true }
  end
end

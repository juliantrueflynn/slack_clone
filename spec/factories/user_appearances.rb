FactoryBot.define do
  factory :user_appearance do
    workspace
    user
    status { 'online' }
  end
end

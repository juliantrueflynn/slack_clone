FactoryBot.define do
  factory :chatroom do
    title { 'Example Title' }
    topic { nil }
    has_dm { false }
    slug { nil }
    association :owner, factory: :user
    workspace
  end
end

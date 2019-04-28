FactoryBot.define do
  factory :read do
    trait :for_chatroom do
      association :readable, factory: :chatroom
    end

    trait :for_message do
      association :readable, factory: :message
    end

    workspace
    user
    accessed_at { nil }
  end
end

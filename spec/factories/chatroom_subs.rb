FactoryBot.define do
  factory :chatroom_sub do
    user
    chatroom
    in_sidebar { true }
  end
end

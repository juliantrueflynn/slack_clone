FactoryBot.define do
  factory :reaction do
    message
    user
    emoji { 'heart_eyes' }
  end
end

FactoryBot.define do
  sequence :email do |n|
    "test#{n}@example.com"
  end

  sequence :username do |n|
    "some_random_username_#{n}"
  end

  factory :user do
    email
    username
    password_digest { 'some_random_password_digest' }
    slug { nil }
  end
end

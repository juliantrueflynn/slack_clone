FactoryBot.define do
  factory :message do
    association :author, factory: :user
    chatroom
    body do
      '{"blocks":[{"key":"random_key_here","text":"Lorem ipsum","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'
    end
    slug { nil }
    entity_type { 'entry' }
    parent_message_id { nil }
  end
end

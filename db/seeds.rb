require 'faker'

REACTIONS = %w(joy smile heart_eyes innocent +1 point_up).freeze

def random_num(min: 3, max: 9)
  [*min.to_i..max.to_i].sample
end

def random_string
  lorem_ipsum = [
    Faker::Lorem.paragraph(random_num, rand < 0.5, random_num),
    Faker::Lorem.paragraph(random_num),
    Faker::Lorem.sentence,
    Faker::Lorem.sentence(random_num, rand < 0.5),
    Faker::Lorem.question,
    Faker::Lorem.questions(random_num).join(" "),
    Faker::Lorem.word
  ]

  lorem_ipsum.sample
end

def random_message_body
  '{"blocks":[{"key":"' +
  SecureRandom.urlsafe_base64(6) +
  '","text":"' +
  random_string +
  '","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'
end

def seed_sub_and_members(user)
  workspace = Workspace.all.sample
  chat = workspace.channels.sample
  return nil unless chat

  workspace.subs.create(user_id: user.id) unless workspace.is_user_sub?(user.id)
  chat.subs.create(user_id: user.id) unless chat.is_user_sub?(user.id)
end

def seed_workspace(user)
  title = Faker::Company.unique.name
  user.created_workspaces.create(title: title, slug: "#{title.parameterize}")
end

def seed_chats(user)
  workspace = user.workspaces.sample
  return nil unless workspace

  title = Faker::Company.unique.buzzword
  topic = rand < 0.2 ? Faker::Company.bs : nil
  user.created_channels.create(title: title, topic: topic, workspace_id: workspace.id)
end

User.create!(email: "jtf@gmail.com", username: "jtf", password: "123456")

random_num(min: 2, max: 4).times do
  seed_workspace(User.first)

  random_num(min: 1, max: 3).times do
    User.first.channels.create(
      title: Faker::Company.unique.buzzword,
      topic: (rand < 0.2 ? Faker::Company.bs : nil),
      workspace_id: Workspace.last.id
    )
  end
end

random_num(min: 8, max: 16).times do
  User.create(
    email: Faker::Internet.unique.email,
    username: Faker::Internet.unique.user_name,
    password: "123456"
  )
end

random_num(min: 30, max: 40).times do
  user = User.all.sample

  seed_workspace(user) if rand < 0.1
  seed_chats(user) if rand < 0.1
  seed_sub_and_members(user)
end

random_num(min: 50, max: 60).times do
  user = User.all.sample
  chat = user.channels.sample
  next unless chat

  loop do
    user.messages.create(body: random_message_body, channel_id: chat.id)

    break if rand < 0.4
  end

  loop do
    break if chat.parent_messages.empty?
    break if rand < 0.8

    parent = chat.parent_messages.sample
    user.messages.create(
      body: random_message_body,
      channel_id: chat.id,
      parent_message_id: parent.id
    )

    unread_params = { unreadable_id: parent.id, unreadable_type: 'Message' }
    message_unread = Unread.find_or_initialize_by(unread_params) do |unread|
      unread.active_at = parent.replies.last.created_at
    end
    message_unread.save!
  end

  if rand < 0.5
    message = chat.messages.sample
    next unless message

    user.favorites.create(message_id: message.id) if rand < 0.5
    user.reactions.create(message_id: message.id, emoji: REACTIONS.sample)
  end
end

User.first.channels.shuffle.each do |chat|
  next unless chat.messages.first
  next if rand < 0.4

  accessed_at = chat.messages.sample.created_at
  read_chat = chat.reads.find_or_initialize_by(readable_type: 'Channel', user_id: 1)
  read_chat.save!
end

Channel.all.each do |chat|
  next if chat.messages.empty?

  unread_params = { unreadable_id: chat.id, unreadable_type: 'Channel' }
  last_message = chat.messages.where(parent_message_id: nil).last
  chat_unread = Unread.find_or_initialize_by(unread_params) do |unread|
    unread.active_at = last_message.created_at
  end
  chat_unread.save!
end
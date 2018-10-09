require 'faker'

REACTIONS = %w(joy smile heart_eyes innocent +1 point_up).freeze

def random_num(min: 3, max: 9)
  [*min.to_i..max.to_i].sample
end

def rand_date(from: DateTime.now - 90, to: DateTime.now - 2)
  from ||= DateTime.now
  Faker::Date.between(from, to)
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

  unless chat.is_user_sub?(user.id)
    chat.subs.create(user_id: user.id, created_at: DateTime.now - 3)
  end
end

def seed_workspace(user)
  title = Faker::Company.unique.name
  user.created_workspaces.create(title: title, slug: title.parameterize)
end

def seed_chats(user)
  workspace = user.workspaces.sample
  return unless workspace

  title = Faker::Company.unique.buzzword
  user.created_channels.create(title: title, workspace_id: workspace.id)
end

User.create!(email: "jtf@gmail.com", username: "jtf", password: "123456")

3.times do
  workspace = seed_workspace(User.first)

  3.times do
    chat = User.first.created_channels.create(
      title: Faker::Company.unique.buzzword,
      topic: (rand < 0.2 ? Faker::Company.bs : nil),
      workspace_id: workspace.id
    )
  end
end

10.times do
  User.create(
    email: Faker::Internet.unique.email,
    username: Faker::Internet.unique.user_name,
    password: "123456"
  )
end

30.times do
  user = User.where.not(id: 1).sample

  seed_sub_and_members(user)
  seed_chats(user) if rand < 0.3
end

50.times do
  user = User.all.sample
  chat = user.channels.sample

  next unless chat

  loop do
    message = user.messages.create(body: random_message_body, channel_id: chat.id)
    break if rand < 0.4
  end

  loop do
    break if chat.parent_messages.empty?
    break if rand < 0.8

    parent = chat.parent_messages.sample
    message = user.messages.where(entity_type: 'entry').create(
      body: random_message_body,
      channel_id: chat.id,
      parent_message_id: parent.id,
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
  last_message = chat.messages.without_children.last
  chat_unread = Unread.find_or_initialize_by(unread_params) do |unread|
    unread.active_at = last_message.created_at
  end
  chat_unread.save!
end

User.first.channels.each do |chat|
  next if chat.messages.empty?
  next if chat.messages.length < 11

  sub_messages = chat.messages.where.not(entity_type: 'entry')
  messages = chat.messages.with_entry_type

  sub_messages.each do |sub_message|
    date = DateTime.now - 4
    sub_message.update_attribute(:created_at, date)

    user_messages = chat.messages.where(author_id: 1).without_children
    if user_messages.exists?
      user_read = chat.reads.by_user_id(1)
      user_read.update_attribute(accessed_at: user_messages.last.created_at)
    end
  end

  sub_date = sub_messages.last.created_at
  date = sub_date + 10.minutes
  messages.first.update(created_at: date, updated_at: date)  
end
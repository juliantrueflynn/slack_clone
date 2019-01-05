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

  unless workspace.is_user_sub?(user.id)
    workspace.workspace_subs.create(user_id: user.id)
  end

  unless chat.is_user_sub?(user.id)
    chat.subs.create(user_id: user.id)
  end
end

def seed_chats(user)
  workspace = user.workspaces.sample
  return unless workspace

  created_at = DateTime.now - 6
  title = Faker::Company.unique.buzzword
  user.created_channels.create(
    title: title,
    workspace_id: workspace.id,
    created_at: created_at,
    updated_at: created_at
  )
end

def update_entity_reads(entity)
  read = entity.reads.find_or_initialize_by_user(1)
  read.save!
end

def generate_message_interaction(chat)
  user = chat.members.sample
  message = chat.messages.with_entry_type.sample
  return unless message
  user.favorites.create(message_id: message.id) if rand < 0.3
  user.reactions.create(message_id: message.id, emoji: REACTIONS.sample)
end

User.create!(email: "jtf@gmail.com", username: "jtf", password: "123456")

3.times do
  title = Faker::Company.unique.name
  created_at = DateTime.now - 8

  workspace = User.first.created_workspaces.create(
    title: title,
    slug: title.parameterize,
    created_at: created_at,
    updated_at: created_at,
    skip_broadcast: true
  )

  default_channels = %w(general random).reduce([]) do |memo, title|
    memo << {
      title: title,
      workspace_id: workspace.id,
      created_at: created_at,
      updated_at: created_at
    }
  end

  User.first.created_channels.create(default_channels)
  
  workspace.channels.first(2).each { |ch| update_entity_reads(ch) }

  3.times do
    chat = User.first.created_channels.create(
      title: Faker::Company.unique.buzzword,
      topic: (rand < 0.2 ? Faker::Company.bs : nil),
      workspace_id: workspace.id,
      created_at: created_at,
      updated_at: created_at
    )

    update_entity_reads(chat)
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

Workspace.all.each do |workspace|
  workspace.channels.first(2).each do |chat|
    created_at = DateTime.now - 12

    chat.update_attributes(
      created_at: created_at,
      updated_at: created_at
    )
  end
end

User.first.workspaces.each do |workspace|
  chats = User.first.channels.where(workspace_id: workspace.id)
  chats.each do |chat|
    chat.messages.create(
      body: random_message_body,
      author_id: 1,
      created_at: chat.created_at + 1,
      updated_at: chat.created_at + 1
    )
  end
end

50.times do
  user = User.all.sample
  chat = user.channels.sample

  next unless chat

  parent_entries = chat.messages.by_entry_parent

  loop do
    user.messages.create(body: random_message_body, channel_id: chat.id)
    break if rand < 0.4
  end

  loop do
    break if parent_entries.empty?
    break if rand < 0.75

    parent = parent_entries.sample
    user.messages.create(
      body: random_message_body,
      channel_id: chat.id,
      parent_message_id: parent.id
    )
  end

  unless parent_entries.empty?
    convo = parent_entries.sample
    user.messages.create(
      body: random_message_body,
      channel_id: convo.channel_id,
      parent_message_id: convo.id
    )
  end

  generate_message_interaction(chat) if rand < 0.7
end

Channel.all.each do |chat|
  sub_messages = chat.messages.take_while do |sub_msg|
    sub_msg.update_attributes(
      created_at: chat.created_at,
      updated_at: chat.created_at
    )
  end
end

Workspace.all.each do |workspace|
  all_convos = workspace.messages.convos_with_author_id(1)
  parents = all_convos.where(parent_message_id: nil)

  reads = parents.reduce([]) do |memo, curr|
    memo << {
      readable_id: curr.id,
      readable_type: 'Message',
      workspace_id: workspace.id
    }
  end

  User.first.reads.create(reads)
end

20.times do
  user = User.all.except(1).sample
  chat = user.channels.sample

  next unless chat

  loop do
    user.messages.create(body: random_message_body, channel_id: chat.id)
    break if rand < 0.4
  end

  parent_entries = chat.messages.by_entry_parent

  loop do
    break if parent_entries.empty?
    break if rand < 0.75

    parent = parent_entries.sample
    user.messages.create(
      body: random_message_body,
      channel_id: chat.id,
      parent_message_id: parent.id
    )
  end

  generate_message_interaction(chat) if rand < 0.7
end
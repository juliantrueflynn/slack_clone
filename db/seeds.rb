require 'faker'

REACTIONS = %w(joy smile heart_eyes innocent +1 point_up).freeze

def random_num(min: 3, max: 9)
  [*min.to_i..max.to_i].sample
end

def random_message_body_text
  [
    Faker::Lorem.paragraph(random_num, rand < 0.5, random_num),
    Faker::Lorem.paragraph(random_num),
    Faker::Lorem.sentence,
    Faker::Lorem.sentence(random_num, rand < 0.5),
    Faker::Lorem.question,
    Faker::Lorem.questions(random_num).join(" "),
    Faker::Lorem.word
  ].sample
end

def generate_message_body
  '{"blocks":[{"key":"' +
  SecureRandom.urlsafe_base64(6) +
  '","text":"' +
  random_message_body_text +
  '","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'
end

def generate_workspace(user)
  title = Faker::Company.unique.name
  slug = title.parameterize
  workspace = user.created_workspaces.create!(title: title, slug: slug)
end

def seed_workspace_sub
  user = User.all.sample
  workspace = Workspace.includes(:workspace_subs).where.not(workspace_subs: { user_id: user }).take
  return unless workspace
  workspace.workspace_subs.find_or_create_by!(user_id: user.id)
end

def seed_chat_subs
  user = User.all.sample
  workspace = user.workspaces.sample
  return unless workspace
  chat = workspace.channels.includes(:subs).where.not(channel_subs: { user_id: user }).take
  chat.subs.find_or_create_by!(user_id: user.id)
  chat.reads.find_or_create_by!(user_id: user.id)
end

def seed_chat
  user = User.all.sample
  workspace = user.workspaces.sample  
  return unless workspace
  title = Faker::Company.unique.buzzword
  topic = (rand < 0.2 ? Faker::Company.bs : nil)
  user.created_channels.create!(
    title: title,
    topic: topic,
    workspace_id: workspace.id
  )
end

def generate_message_interaction(chat)
  user = chat.members.sample
  message = chat.messages.with_entry_type.sample
  return unless message
  user.favorites.find_or_create_by!(message_id: message.id) if rand < 0.3
  emoji = REACTIONS.sample
  user.reactions.find_or_create_by!(emoji: emoji, message_id: message.id)
end

User.create!(email: "demo", username: "demouser", password: "123456")

10.times do
  User.create!(
    email: Faker::Internet.unique.email,
    username: Faker::Internet.unique.user_name,
    password: "123456"
  )
end

3.times { generate_workspace(User.first) }

5.times do
  user = User.where.not(id: 1).sample
  generate_workspace(user)
end

15.times { seed_workspace_sub }
10.times { seed_chat }
30.times { seed_chat_subs }

50.times do
  user = User.all.sample
  chat = user.channels.sample
  next unless chat

  parent_entries = chat.messages.by_entry_parent

  loop do
    user.messages.create!(body: generate_message_body, channel_id: chat.id)
    break if rand < 0.4
  end

  loop do
    break if parent_entries.empty?
    break if rand < 0.75

    parent = parent_entries.sample
    user.messages.create!(
      body: generate_message_body,
      channel_id: chat.id,
      parent_message_id: parent.id
    )
  end

  unless parent_entries.empty?
    convo = parent_entries.sample
    user.messages.create!(
      body: generate_message_body,
      channel_id: convo.channel_id,
      parent_message_id: convo.id
    )
  end

  generate_message_interaction(chat) if rand < 0.7
end

20.times do
  user = User.all.except(1).sample
  chat = user.channels.sample
  next unless chat

  loop do
    user.messages.create(body: generate_message_body, channel_id: chat.id)
    break if rand < 0.4
  end

  parent_entries = chat.messages.by_entry_parent

  loop do
    break if parent_entries.empty?
    break if rand < 0.75

    parent = parent_entries.sample
    user.messages.create(
      body: generate_message_body,
      channel_id: chat.id,
      parent_message_id: parent.id
    )
  end

  generate_message_interaction(chat) if rand < 0.7
end

User.first.workspaces.each do |workspace|
  all_convos = workspace.messages.convo_parents_with_author_id(1)
  all_convos.each do |convo|
    convo.reads.find_or_create_by!(user_id: user.id)
  end
end

User.first.channels.each do |workspace|
  chats = User.first.channels.where(workspace_id: workspace.id)

  chats.each do |chat|
    chat.messages.create!(body: generate_message_body, author_id: 1)
  end
end
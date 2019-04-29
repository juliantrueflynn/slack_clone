require 'faker'

def random_num(min: 3, max: 9)
  [*min.to_i..max.to_i].sample
end

def message_body_text
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

def message_body
  '{"blocks":[{"key":"' + SecureRandom.urlsafe_base64(6) + '","text":"' +
  message_body_text + '","type":"unstyled","depth":0,"inlineStyleRanges":[],' +
  '"entityRanges":[],"data":{}}],"entityMap":{}}'
end

def chatroom_with_entries
  Chatroom.left_joins(:messages)
    .where(messages: { entity_type: 'entry' })
    .distinct
    .sample
end

def read_create_or_update(entity, user_id)
  entity.reads.find_or_initialize_by(user_id: user_id).save!
end

def read_destroy(entity, user_id)
  read = entity.reads.find_by_user_id(user_id)
  read.delete unless read.nil?
end

def seed_workspace_create(user)
  title = Faker::Company.unique.name
  workspace = user.created_workspaces.create!(
    title: title,
    slug: title.parameterize,
    skip_broadcast: true
  )
end

def seed_workspace_sub_create
  user = User.all.sample
  workspace = Workspace.without_user_sub(user).sample
  return unless workspace

  workspace.subs.find_or_create_by!(user_id: user.id) do |workspace_sub|
    workspace_sub.skip_broadcast = true
  end
end

def seed_workspace_sub_update
  workspace_sub = WorkspaceSub.where.not(user_id: 1).where(is_member: true).sample
  workspace_sub.update!(is_member: false, skip_broadcast: true)
  chatrooms = workspace_sub.user.chatrooms.with_workspace(workspace_sub.workspace)

  chatrooms.each { |chatroom| read_destroy(chatroom, workspace_sub.user.id) }
end

def seed_chatroom_sub_create
  workspace = Workspace.all.sample
  user = workspace.users.sample
  chatroom = workspace.chatrooms.without_user_sub(user).sample
  return unless chatroom

  chatroom.subs.find_or_create_by!(user_id: user.id) do |chatroom_sub|
    chatroom_sub.skip_broadcast = true
  end

  read_create_or_update(chatroom, user.id)
end

def seed_chat_sub_destroy
  workspace = Workspace.all.sample
  user = workspace.users.where.not(id: 1).sample
  default_room = workspace.chatrooms.first
  chatroom_subs = workspace.chatroom_subs
  chatroom_sub = chatroom_subs.where.not(id: default_room).with_user(user).sample
  chatroom_sub.skip_broadcast = true
  chatroom_sub.destroy unless chatroom_sub.nil?
  read_destroy(chatroom_sub.chatroom, user.id)
end

def seed_chatroom_create
  workspace = Workspace.all.sample
  user = workspace.users.sample

  return unless workspace

  chatroom = user.created_chatrooms.create!(
    title: Faker::Company.unique.buzzword,
    topic: (rand < 0.2 ? Faker::Company.bs : nil),
    workspace_id: workspace.id,
    skip_broadcast: true
  )
  read_create_or_update(chatroom, user.id)
end

def seed_parent_message_create
  chatroom = Chatroom.left_joins(:users).distinct.sample
  user = chatroom.users.sample

  return unless user

  loop do
    message = user.messages.create!(
      body: message_body,
      chatroom_id: chatroom.id,
      skip_broadcast: true
    )
    read_create_or_update(chatroom, user.id)
    break if rand < 0.7
  end
end

def seed_child_message_create
  chatroom = chatroom_with_entries
  user = chatroom.users.sample
  parent = chatroom.entries_parents.sample

  return unless user && parent

  reply = parent.children.create!(
    body: message_body,
    author_id: user.id,
    chatroom_id: chatroom.id,
    skip_broadcast: true
  )
  read_create_or_update(parent, user.id)
end

def seed_favorite_create
  user = chatroom_with_entries.users.sample
  message = chatroom_with_entries.entries_parents.sample if user
  user.favorites.find_or_create_by!(message_id: message.id) if message
end

def seed_reaction_create
  user = chatroom_with_entries.users.sample
  message = chatroom_with_entries.messages.sample

  return unless user

  emoji = %w(joy smile heart_eyes innocent +1 point_up).sample
  user.reactions.find_or_create_by!(emoji: emoji, message_id: message.id) do |reaction|
    reaction.skip_broadcast = true
  end
end

User.create!(
  email: 'demo',
  username: 'demouser',
  password: '123456',
  skip_broadcast: true
)

10.times do
  User.create!(
    email: Faker::Internet.unique.email,
    username: Faker::Internet.unique.user_name,
    password: '123456',
    skip_broadcast: true
  )
end

3.times do
  seed_workspace_create(User.first)

  user = User.where.not(id: 1).sample
  seed_workspace_create(user)
end

40.times { seed_workspace_sub_create }
99.times { seed_parent_message_create }
25.times { seed_chatroom_create }
20.times { seed_chatroom_sub_create }
3.times { seed_chat_sub_destroy }
80.times { seed_parent_message_create }
40.times { seed_child_message_create }
20.times { seed_chatroom_sub_create }
5.times { seed_chat_sub_destroy }
60.times { seed_reaction_create }
30.times { seed_favorite_create }
3.times { seed_workspace_sub_update }
99.times { seed_parent_message_create }
30.times { seed_child_message_create }
10.times { seed_chatroom_sub_create }
60.times { seed_parent_message_create }
50.times { seed_reaction_create }

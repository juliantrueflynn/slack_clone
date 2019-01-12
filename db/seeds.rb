require 'faker'

REACTIONS = %w(joy smile heart_eyes innocent +1 point_up).freeze

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
  read = entity.reads.find_by(
    readable_id: entity.id,
    readable_type: entity.class.name,
    user_id: user_id
  )
  read.delete if read
end

def seed_workspace_create(user)
  title = Faker::Company.unique.name
  slug = title.parameterize
  workspace = user.created_workspaces.create!(title: title, slug: slug)
end

def seed_workspace_sub_create
  user = User.all.sample
  workspace = Workspace.without_user_sub(user).sample
  return unless workspace
  workspace.workspace_subs.find_or_create_by!(user_id: user.id)
end

def seed_workspace_sub_update
  user = User.all.where.not(id: 1).sample
  workspace = user.workspaces.sample
  workspace_sub = workspace.workspace_subs.by_user(user)
  workspace_sub.update!(is_member: !workspace_sub.is_member)

  unless !workspace_sub.is_member
    user.chatrooms.where(workspace_id: workspace.id).each do |chat|
      read_destroy(chat, user.id)
    end
  end
end

def seed_chatroom_sub_create
  workspace = Workspace.all.sample
  user = workspace.users.sample
  chat = workspace.chatrooms.without_user_sub(user).sample
  return unless chat
  chat.subs.find_or_create_by!(user_id: user.id)
  read_create_or_update(chat, user.id)
end

def seed_chat_sub_destroy
  user = User.all.where.not(id: 1).sample
  chat = user.chatrooms.sample
  default_chats = chat.workspace.default_chatrooms
  chatroom_sub = chat.subs.where.not(id: default_chats).by_user(user)
  read_destroy(chat, user.id)
end

def seed_chatroom_create
  workspace = Workspace.all.sample
  user = workspace.users.sample
  return unless workspace
  chat = user.created_chatrooms.create!(
    title: Faker::Company.unique.buzzword,
    topic: (rand < 0.2 ? Faker::Company.bs : nil),
    workspace_id: workspace.id
  )
  read_create_or_update(chat, user.id)
end

def seed_parent_message_create
  chat = Chatroom.all.sample
  user = chat.members.sample

  loop do
    message = user.messages.create!(body: message_body, chatroom_id: chat.id)
    read_create_or_update(chat, user.id)
    break if rand < 0.7
  end
end

def seed_child_message_create
  chat = chatroom_with_entries
  user = chat.members.sample
  parent = chat.messages.by_entry_parent.sample

  loop do
    reply = parent.children.create!(
      body: message_body,
      author_id: user.id,
      chatroom_id: chat.id
    )
    read_create_or_update(parent, user.id)
    break if rand < 0.7
  end
end

def seed_favorite_create
  user = chatroom_with_entries.members.sample
  message = chatroom_with_entries.messages.by_entry_parent.sample
  user.favorites.find_or_create_by!(message_id: message.id)
end

def seed_reaction_create
  user = chatroom_with_entries.members.sample
  message = chatroom_with_entries.messages.sample
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

3.times do
  seed_workspace_create(User.first)

  user = User.where.not(id: 1).sample
  seed_workspace_create(user)
end

40.times { seed_workspace_sub_create }
45.times { seed_chatroom_create }
35.times { seed_chatroom_sub_create }
5.times { seed_chat_sub_destroy }
50.times { seed_parent_message_create }
30.times { seed_child_message_create }
30.times { seed_chatroom_sub_create }
10.times { seed_chat_sub_destroy }
60.times { seed_reaction_create }
30.times { seed_favorite_create }
3.times { seed_workspace_sub_update }
40.times { seed_parent_message_create }
30.times { seed_child_message_create }

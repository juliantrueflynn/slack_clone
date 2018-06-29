require 'faker'
Faker::UniqueGenerator.clear

REACTIONS = %w(joy smile heart_eyes innocent +1 point_up)

def is_random_true?
  rand < 0.25
end

def random_lorem_short_or_long
  if rand < 0.1
    return Faker::Lorem.paragraph(4, false, 10)
  elsif rand < 0.1
    return Faker::Lorem.paragraph(15)
  elsif rand < 0.7
    return Faker::Lorem.sentence
  end
  
  Faker::Lorem.word
end

def random_message_body
  '{"blocks":[{"key":"' +
  Faker::Lorem.unique.word +
  '","text":"' +
  random_lorem_short_or_long +
  '","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'
end

User.create(email: "jtf@gmail.com", username: "jtf", password: "123456")
first_user = User.first

users_attrs = []
4.times do
  users_attrs << {
    email: Faker::Internet.unique.email,
    username: Faker::Internet.unique.user_name,
    password: "123456"
  }
end
User.create(users_attrs)

3.times do
  title = Faker::Company.unique.name
  workspace = first_user.created_workspaces.create(
    title: title,
    slug: "#{title.parameterize}",
    owner_id: first_user.id
  )

  3.times do
    title = Faker::Company.unique.buzzword
    first_user.created_channels.create(
      title: title,
      owner_id: first_user.id,
      topic: (is_random_true? ? Faker::Company.bs : nil),
      workspace_id: workspace.id
    )
  end
end

User.all.shuffle.each do |user|
  Workspace.all.shuffle.each do |workspace|
    user.workspace_subs.create(workspace_id: workspace.id) unless user.is_workspace_sub?(workspace)

    workspace.channels.shuffle.each do |channel|
      user.channel_subs.create(channel_id: channel.id) unless user.is_channel_sub?(channel)
      Message.create(
        body: random_message_body,
        author_id: user.id,
        channel_id: channel.id
      )
    end
  end
end

User.all.shuffle.each do |user|
  user.channels.shuffle.each do |channel|
    parent_messages = channel.messages.where(parent_message_id: nil)
    random_message = parent_messages.sample
    next if random_message.nil?
    message = Message.create(
      body: random_message_body,
      author_id: user.id,
      channel_id: channel.id,
      parent_message_id: random_message.id
    )
    random_message.favorites.create(user_id: user.id)
    random_message.reactions.create(user_id: user.id, emoji: REACTIONS.sample)
  end
end
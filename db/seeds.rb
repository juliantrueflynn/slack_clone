require 'faker'

User.create(email: "jtf@gmail.com", username: "jtf", password: "123456")
first_user = User.first

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

3.times do
  title = Faker::Company.unique.name
  workspace = first_user.created_workspaces.create(
    title: title,
    slug: "#{title.parameterize}",
    owner_id: User.first.id
  )

  3.times do
    title = Faker::Company.unique.buzzword
    first_user.created_channels.create(
      title: title,
      owner_id: User.first.id,
      topic: (is_random_true? ? Faker::Company.bs : nil),
      workspace_id: workspace.id
    )
  end
end

6.times do
  user = User.create(
    email: Faker::Internet.unique.email,
    username: Faker::Internet.unique.user_name,
    password: "123456"
  )

  Workspace.all.shuffle.each do |workspace|
    next if user.is_workspace_sub?(workspace) || is_random_true?
    user.workspace_subs.create(
      workspace_id: workspace.id
    )

    workspace.channels.shuffle.each do |channel|
      next if user.is_channel_sub?(channel) || is_random_true?
  
      user.channel_subs.create(
        channel_id: channel.id
      )
  
      [*1..3].sample.times do
        next if is_random_true?
        message = Message.create(
          body: random_message_body,
          author_id: user.id,
          channel_id: channel.id
        )

        message.favorites.create(user_id: user.id) if rand < 0.40
        message.reactions.create(user_id: user.id, emoji: REACTIONS.sample) if rand < 0.40
      end
  
      random_parent_message = channel.messages.sample
      next if random_parent_message.nil? || rand < 0.60
      Message.create(
        body: random_message_body,
        author_id: user.id,
        channel_id: channel.id,
        parent_message_id: random_parent_message.id
      )
    end
  end
end

3.times do
  first_user.reactions.create(
    message_id: Channel.all.sample.messages.sample.id,
    emoji: REACTIONS.sample
  )

  first_user.favorites.create(message_id: Channel.all.sample.messages.sample.id)
end
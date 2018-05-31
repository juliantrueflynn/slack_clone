require 'faker'

User.create(email: "jtf@gmail.com", username: "jtf", password: "123456")

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
  workspace = Workspace.create(
    title: title,
    slug: "#{title.parameterize}",
    owner_id: User.first.id
  )

  3.times do
    title = Faker::Company.unique.buzzword
    Channel.create(
      title: title,
      owner_id: User.first.id,
      topic: (is_random_true? ? Faker::Company.bs : nil),
      workspace_id: workspace.id
    )
  end
end

8.times do
  user = User.create(
    email: Faker::Internet.unique.email,
    username: Faker::Internet.unique.user_name,
    password: "123456"
  )

  Workspace.all.shuffle.each do |workspace|
    next if user.is_workspace_sub?(workspace) || is_random_true?
    WorkspaceSub.create(
      workspace_id: workspace.id,
      user_id: user.id
    )

    workspace.channels.shuffle.each do |channel|
      next if user.is_channel_sub?(channel) || is_random_true?
  
      ChannelSub.create(
        channel_id: channel.id,
        user_id: user.id
      )
  
      [*1..4].sample.times do
        next if is_random_true?
        Message.create(
          body: random_message_body,
          author_id: user.id,
          channel_id: channel.id
        )
      end
  
      random_parent_message = channel.parent_messages.sample
      next if random_parent_message.nil? || rand < 0.60
      Message.create(
        body: random_message_body,
        author_id: user.id,
        channel_id: channel.id,
        parent_message_id: random_parent_message.id
      )

      3.times do
        Reaction.create(
          user_id: user.id,
          message_id: channel.messages.sample.id,
          emoji: REACTIONS.sample
        )
      end

      MessageFav.create(
        user_id: user.id,
        message_id: channel.messages.sample.id
      )
    end
  end
end

# Subscribe first user to all workspaces, channels, favs, reactions
Workspace.all.each do |workspace|
  WorkspaceSub.create(workspace_id: workspace.id, user_id: User.first.id)
end

Channel.all.each do |channel|
  ChannelSub.create(channel_id: channel.id, user_id: User.first.id)
end

3.times do
  Reaction.create(
    user_id: User.first.id,
    message_id: Channel.all.sample.messages.sample.id,
    emoji: REACTIONS.sample
  )

  MessageFav.create(
    user_id: User.first.id,
    message_id: Channel.all.sample.messages.sample.id
  )
end
@channels.each do |channel|
  json.set! channel.id do
    json.id channel.id
    json.title channel.title
    json.topic channel.topic
  end
end
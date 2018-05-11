@channels.each do |channel|
  json.set! channel.slug do
    json.(channel, :id, :title, :slug, :topic)
  end
end
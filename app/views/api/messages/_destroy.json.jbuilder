json.partial! 'api/messages/message', message: message
json.thread message.replies.pluck(:slug)
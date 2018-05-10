import cable from 'actioncable';

let consumer, callback;

export function createChannel(...args) {
  if (!consumer) {
    consumer = cable.createConsumer();
  }

  return consumer.subscriptions.create(...args);
}

const chat = createChannel("ChatChannel", {
  received({ message }) {
    if (callback) callback.call(null, message);
  }
});

// Sending a message: "perform" method calls a respective Ruby method
// defined in chat_channel.rb. That's your bridge between JS and Ruby!
export function sendMessage(message) {
  chat.perform("send_message", { message });
}

// Getting a message: this callback will be invoked once we receive
// something over ChatChannel
export function setCallback(fn) {
  callback = fn;
}
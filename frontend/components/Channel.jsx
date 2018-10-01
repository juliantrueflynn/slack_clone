import React from 'react';
import MessageFormContainer from './MessageFormContainer';
import ChannelSubscribe from './ChannelSubscribe';
import ChannelBlurb from './ChannelBlurb';
import MessageContainer from './MessageContainer';
import Scrollable from './Scrollable';

const Channel = ({
  chatPath,
  messages,
  authors,
  createChannelSubRequest,
  chatTitle,
  currentUser,
  isLoading,
  channels,
}) => {
  const channel = channels[chatPath];

  if (!channel || isLoading) {
    return null;
  }

  if (!messages.length) {
    return (
      <div className="Channel">
        Make the 1st message!
      </div>
    );
  }

  const placeholder = channel.hasDm ? `@${chatTitle}` : chatTitle;
  const formPlaceholder = placeholder && `Message ${placeholder}`;
  const ownerName = channel.ownerSlug && authors[channel.ownerSlug].username;

  return (
    <div className="Channel">
      <Scrollable
        currentUserId={currentUser.id}
        messages={messages}
        isAutoScroll
      >
        <ChannelBlurb
          chatTitle={chatTitle}
          ownerName={ownerName}
          channel={channel}
        />
        {messages.map(message => (
          <MessageContainer key={message.slug} users={authors} message={message} />
        ))}
      </Scrollable>
      {/* <MessageFormContainer channelId={channel.id} placeholder={formPlaceholder} /> */}
      <ChannelSubscribe
        chatTitle={chatTitle}
        ownerName={ownerName}
        channel={channel}
        currentUserSlug={currentUser.slug}
        createChannelSubRequest={createChannelSubRequest}
      />
    </div>
  );
};

export default Channel;

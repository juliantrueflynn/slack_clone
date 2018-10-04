import React from 'react';
import MessageFormContainer from './MessageFormContainer';
import ChannelSubscribe from './ChannelSubscribe';
import ChannelBlurb from './ChannelBlurb';
import MessageContainer from './MessageContainer';
import Scrollable from './Scrollable';

const Channel = ({
  channel,
  messages,
  authors,
  fetchHistoryRequest,
  createChannelSubRequest,
  currentUser,
  isLoading,
}) => {
  if (!channel) {
    return null;
  }

  const placeholder = channel.hasDm ? `@${channel.title}` : channel.title;
  const formPlaceholder = placeholder && `Message ${placeholder}`;

  return (
    <div className="Channel">
      {isLoading || (
        <Scrollable
          fetchHistoryRequest={fetchHistoryRequest}
          currentUserId={currentUser.id}
          messages={messages}
          isAutoScroll
        >
          <ChannelBlurb channel={channel} currentUserSlug={currentUser.slug} />
          {messages.map(message => (
            <MessageContainer key={message.slug} users={authors} message={message} />
          ))}
        </Scrollable>
      )}
      <MessageFormContainer channelId={channel.id} placeholder={formPlaceholder} />
      <ChannelSubscribe
        channel={channel}
        createChannelSubRequest={createChannelSubRequest}
      />
    </div>
  );
};

export default Channel;

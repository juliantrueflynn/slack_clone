import React from 'react';
import MessagesPane from './MessagesPane';
import MessageFormContainer from './MessageFormContainer';
import ChannelSubscribe from './ChannelSubscribe';

const Channel = ({
  chatPath,
  messages,
  rightSidebar,
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
  const ownerName = authors[channel.ownerSlug] && authors[channel.ownerSlug].username;
  const currentUserSlug = currentUser && currentUser.slug;

  return (
    <div className="Channel">
      <MessagesPane
        chatTitle={chatTitle}
        messages={messages}
        users={authors}
        channel={channel}
        rightSidebar={rightSidebar}
      />
      {/* <MessageFormContainer channelId={channel.id} placeholder={formPlaceholder} /> */}
      <ChannelSubscribe
        chatTitle={chatTitle}
        ownerName={ownerName}
        channel={channel}
        currentUserSlug={currentUserSlug}
        createChannelSubRequest={createChannelSubRequest}
      />
    </div>
  );
};

export default Channel;

import React, { Fragment } from 'react';
import MessagesPane from './MessagesPane';
import MessageFormContainer from './MessageFormContainer';
import ChannelSubscribe from './ChannelSubscribe';

const Channel = ({
  messages,
  channel,
  rightSidebar,
  authors,
  createChannelSubRequest,
  chatTitle,
  currentUser,
  isLoading,
}) => {
  if (!channel || isLoading) {
    return null;
  }

  if (!messages.length) {
    return (
      <Fragment>
        Make the 1st message!
      </Fragment>
    );
  }

  const placeholder = channel.hasDm ? `@${chatTitle}` : chatTitle;
  const formPlaceholder = placeholder && `Message ${placeholder}`;
  const ownerName = authors[channel.ownerSlug] && authors[channel.ownerSlug].username;
  const currentUserSlug = currentUser && currentUser.slug;

  return (
    <Fragment>
      <MessagesPane
        chatTitle={chatTitle}
        messages={messages}
        users={authors}
        channel={channel}
        rightSidebar={rightSidebar}
      />
      <MessageFormContainer channelId={channel.id} placeholder={formPlaceholder} />
      <ChannelSubscribe
        chatTitle={chatTitle}
        ownerName={ownerName}
        channel={channel}
        currentUserSlug={currentUserSlug}
        createChannelSubRequest={createChannelSubRequest}
      />
    </Fragment>
  );
};

export default Channel;

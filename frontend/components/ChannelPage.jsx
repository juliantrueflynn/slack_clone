import React, { Fragment } from 'react';
import MessagesPane from './MessagesPane';
import MessageFormContainer from './MessageFormContainer';
import ChannelSubscribe from './ChannelSubscribe';

const ChannelPage = ({
  messages,
  channel,
  rightSidebar,
  authors,
  isChatSub,
  currentUser,
  createChannelSubRequest,
  chatTitle,
}) => {
  if (!channel) {
    return null;
  }

  const placeholder = channel.hasDm ? `@${chatTitle}` : chatTitle;
  const formPlaceholder = placeholder && `Message ${placeholder}`;
  const ownerName = authors[channel.ownerSlug] && authors[channel.ownerSlug].username;

  return (
    <Fragment>
      <MessagesPane
        messages={messages}
        users={authors}
        channel={channel}
        rightSidebar={rightSidebar}
      />
      <MessageFormContainer placeholder={formPlaceholder} />
      <ChannelSubscribe
        title={chatTitle}
        ownerName={ownerName}
        channel={channel}
        isChatSub={isChatSub}
        userId={currentUser.id}
        createChannelSubRequest={createChannelSubRequest}
      />
    </Fragment>
  );
};

export default ChannelPage;

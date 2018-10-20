import React from 'react';
import Scrollable from './Scrollable';
import MessageContainer from './MessageContainer';

const FavoritesDrawer = ({ messages, users }) => (
  <Scrollable>
    {messages.map(message => (
      <MessageContainer
        key={message.slug}
        users={users}
        message={message}
        isThreadHidden
      />
    ))}
  </Scrollable>
);

export default FavoritesDrawer;

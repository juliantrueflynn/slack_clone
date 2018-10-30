import React from 'react';
import MessagesList from './MessagesList';

const FavoritesDrawer = ({ messages }) => (
  <MessagesList messages={messages} role="listitem" isThreadHidden />
);

export default FavoritesDrawer;

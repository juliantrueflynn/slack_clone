import React from 'react';
import Scrollable from './Scrollable';
import MessagesList from './MessagesList';

const FavoritesDrawer = ({ messages }) => (
  <Scrollable>
    <MessagesList messages={messages} role="listitem" isThreadHidden />
  </Scrollable>
);

export default FavoritesDrawer;

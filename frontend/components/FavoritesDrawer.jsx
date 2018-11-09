import React from 'react';
import MessagesList from './MessagesList';

const FavoritesDrawer = ({ messages }) => {
  const filterMenuItems = ['dropdown', 'reaction', 'convo'];

  return (
    <MessagesList
      messages={messages}
      role="listitem"
      filterMenuItems={filterMenuItems}
      isThreadHidden
    />
  );
};

export default FavoritesDrawer;

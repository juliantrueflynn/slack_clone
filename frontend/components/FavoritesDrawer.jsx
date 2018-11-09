import React from 'react';
import MessagesList from './MessagesList';

const FavoritesDrawer = ({ messages }) => {
  const filterMenuItems = ['dropdown', 'reaction', 'convo'];
  const style = {
    padding: '3px 13px 12px',
    margin: '10px 8px',
    backgroundColor: '#FFF',
    borderBottom: '1px solid #DFE6E9',
  };

  return (
    <MessagesList
      messages={messages}
      role="listitem"
      filterMenuItems={filterMenuItems}
      isThreadHidden
      style={style}
    />
  );
};

export default FavoritesDrawer;

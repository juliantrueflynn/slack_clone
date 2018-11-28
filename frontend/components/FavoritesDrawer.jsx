import React from 'react';
import MessagesListContainer from './MessagesListContainer';

const FavoritesDrawer = ({ messages }) => {
  const filterMenuItems = ['dropdown', 'reaction', 'convo'];
  const style = {
    padding: '3px 10px 12px',
    margin: '10px 8px',
    backgroundColor: '#FFF',
    borderBottom: '1px solid #DFE6E9',
  };

  return (
    <MessagesListContainer
      messages={messages}
      role="listitem"
      filterMenuItems={filterMenuItems}
      style={style}
      isThreadHidden
      isHoverable
    />
  );
};

export default FavoritesDrawer;

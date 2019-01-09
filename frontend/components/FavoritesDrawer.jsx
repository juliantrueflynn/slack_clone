import React from 'react';
import MessagesListContainer from './MessagesListContainer';
import './FavoritesDrawer.css';

const FavoritesDrawer = ({ messages }) => {
  const filterMenuItems = ['dropdown', 'reaction', 'convo'];

  return (
    <div className="FavoritesDrawer">
      <MessagesListContainer
        messages={messages}
        role="listitem"
        filterMenuItems={filterMenuItems}
        isThreadHidden
        isHoverable
      />
    </div>
  );
};

export default FavoritesDrawer;

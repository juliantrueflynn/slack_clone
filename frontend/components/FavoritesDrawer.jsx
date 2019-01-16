import React from 'react';
import MessagesListContainer from './MessagesListContainer';
import './FavoritesDrawer.css';

const FavoritesDrawer = ({ messages }) => {
  const filterMenuItems = ['dropdown', 'reaction', 'convo'];

  if (!messages.length) {
    return (
      <div className="FavoritesDrawer FavoritesDrawer--empty">
        You haven&#8217;t favorited anything yet!
      </div>
    );
  }

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

import React from 'react';
import MessagesListContainer from '../../containers/MessagesListContainer';
import './styles.css';

const FavoritesDrawer = ({ messages }) => {
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
        isThreadHidden
        isHoverable
      />
    </div>
  );
};

export default FavoritesDrawer;

import React from 'react';
import MessagesListContainer from '../../containers/MessagesListContainer';
import './styles.css';

const DrawerFavorites = ({ messages }) => {
  if (!messages.length) {
    return (
      <div className="DrawerFavorites DrawerFavorites--empty">
        You haven&#8217;t favorited anything yet!
      </div>
    );
  }

  return (
    <div className="DrawerFavorites">
      <MessagesListContainer
        messages={messages}
        role="listitem"
        isThreadHidden
        isHoverable
      />
    </div>
  );
};

export default DrawerFavorites;

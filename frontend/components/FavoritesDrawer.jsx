import React from 'react';
import withDrawer from './withDrawer';

const FavoritesDrawer = ({ messages }) => {
  const favorites = Object.values(messages);

  return (
    <div className="UserFavorites" role="list">
      {favorites && favorites.map(fav => (
        <div key={fav.id} className="UserFavorites__item" role="listitem">
          id:
          {fav.id}
          <br />
          messageId:
          {fav.messageId}
          <br />
          userId:
          {fav.userId}
        </div>
      ))}
    </div>
  );
};

export default withDrawer('Favorites')(FavoritesDrawer);

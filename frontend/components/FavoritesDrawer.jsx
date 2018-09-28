import React from 'react';
import withDrawer from './withDrawer';
import MessagesPane from './MessagesPane';

const FavoritesDrawer = ({ messages, members }) => (
  <MessagesPane
    messages={messages}
    users={members}
  />
);

export default withDrawer('Favorites')(FavoritesDrawer);

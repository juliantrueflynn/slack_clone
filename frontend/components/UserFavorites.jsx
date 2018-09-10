import React from 'react';
import RightSidebarContainer from './RightSidebarContainer';

class UserFavorites extends React.Component {
  componentDidMount() {
    const { isWorkspaceLoaded, fetchFavoritesRequest, match: { params } } = this.props;

    if (isWorkspaceLoaded) {
      fetchFavoritesRequest(params.workspaceSlug);
    }
  }

  componentDidUpdate(prevProps) {
    const { fetchFavoritesRequest, match: { params }, favorites } = this.props;
    const { favorites: prevFavs } = prevProps;

    if (prevFavs[prevFavs.length] !== favorites[favorites.length]) {
      fetchFavoritesRequest(params.workspaceSlug);
    }
  }

  render() {
    const { favorites } = this.props;

    const sidebarProps = { path: '/favorites' };

    return (
      <RightSidebarContainer
        sidebarType="Favorites"
        sidebarProps={sidebarProps}
      >
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
      </RightSidebarContainer>
    );
  }
}

export default UserFavorites;

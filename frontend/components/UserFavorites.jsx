import React from 'react';
import RightSidebarContainer from './Layout/RightSidebarContainer';

class UserFavorites extends React.Component {
  componentDidMount() {
    const { isChannelLoaded, fetchFavoritesRequest, workspaceSlug } = this.props;
    if (isChannelLoaded) fetchFavoritesRequest(workspaceSlug);
  }

  componentDidUpdate(prevProps) {
    const { message, match: { isExact, params }, ...props } = this.props;

    if (isExact && props.location.pathname !== prevProps.location.pathname) {
      props.fetchMessageRequest(params.messageSlug);
      if (message) props.updateReadRequest(message.id);
    }
  }

  render() {
    const { favorites, match } = this.props;

    if (!favorites) {
      return null;
    }

    return (
      <RightSidebarContainer sidebarType="Favorites" match={match}>
        <ul className="user-favorites">
          {favorites.map(fav => (
            <li key={fav.id}>
              id:
              {fav.id}
              <br />
              messageId:
              {fav.messageId}
              <br />
              userId:
              {fav.userId}
            </li>
          ))}
        </ul>
      </RightSidebarContainer>
    );
  }
}

export default UserFavorites;

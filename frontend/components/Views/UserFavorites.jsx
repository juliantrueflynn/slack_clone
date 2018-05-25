import React from 'react';
import RightSidebarContainer from '../Layout/RightSidebarContainer';

class UserFavorites extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.openRightSidebar();
  }

  componentDidUpdate(prevProps) {
    const { match: { path }, openRightSidebar } = this.props;
    const favPath = '/:workspaceSlug/:channelSlug/favorites';
    
    if (path === favPath && prevProps.match.path !== favPath) {
      openRightSidebar();
    }
  }

  render() {
    const { favorites, match } = this.props;

    if (!favorites) {
      return null;
    }

    return (
      <RightSidebarContainer sidebarTitle="Favorites" match={match}>
        <ul className="user-favorites">
          {favorites.map(fav => (
            <li key={fav.id}>
              id: {fav.id}<br/>
              messageId: {fav.messageId}<br/>
              userId: {fav.userId}
            </li>
          ))}
        </ul>
      </RightSidebarContainer>
    );
  }
}

export default UserFavorites;
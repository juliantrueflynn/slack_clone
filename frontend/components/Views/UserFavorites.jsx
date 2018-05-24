import React from 'react';
import ChannelRightSidebarContainer
  from '../Channel/ChannelRightSidebarContainer';

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
      <ChannelRightSidebarContainer sidebarTitle="Favorites" match={match}>
        <ul className="user-favorites">
          {favorites.map(fav => (
            <li key={fav.id}>
              id: {fav.id}<br/>
              messageId: {fav.messageId}<br/>
              userId: {fav.userId}
            </li>
          ))}
        </ul>
      </ChannelRightSidebarContainer>
    );
  }
}

export default UserFavorites;
import React from 'react';
import MessageThread from '../Message/MessageThread';
import ChannelPageContainer from './ChannelPageContainer';
import ChannelPage from './ChannelPage';

class ChannelRightSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.handleCloseSidebar = this.handleCloseSidebar.bind(this);
  }

  // componentDidMount() {
  //   const { openRightSidebar, messageSlug, match } = this.props;
  //   if (match.path === '/:workspaceSlug/:channelSlug/favorites') {
  //     openRightSidebar('Favorites', {});
  //   }
  // }

  // componentDidUpdate(prevProps) {
  //   const { sidebarTitle, messageSlug, match, openRightSidebar } = this.props;

  //   if (
  //     match.path === '/:workspaceSlug/:channelSlug/favorites'
  //     && prevProps.match.path !== '/:workspaceSlug/:channelSlug/favorites'
  //   ) {
  //     openRightSidebar(sidebarTitle, {});
  //   }
  // }

  handleCloseSidebar() {
    const { match: { params } } = this.props;
    this.props.closeRightSidebar();
    this.props.navigate(`/${params.workspaceSlug}/${params.channelSlug}`);
  }

  render() {
    const {
      isRightSidebarOpen,
      rightSidebar,
      message,
      messageSlug,
      threadEntries,
      favorites
    } = this.props;

    if (!isRightSidebarOpen) {
      return null;
    }

    return (
      <aside className="channel-right-sidebar">
        <header className="channel-right-sidebar__header">
          <h4>{this.props.sidebarTitle}</h4>
          <button onClick={this.handleCloseSidebar}>&#10006;</button>
        </header>
        
        {this.props.children}
        {/* {favorites && rightSidebar.sidebarType === 'Favorites' && (
          <ul>
            {favorites.map(fav => (
              <li key={fav.id}>
                id: {fav.id}<br/>
                messageId: {fav.messageId}<br/>
                userId: {fav.userId}
              </li>
            ))}
          </ul>
        )} */}
      </aside>
    );
  }
}

export default ChannelRightSidebar;
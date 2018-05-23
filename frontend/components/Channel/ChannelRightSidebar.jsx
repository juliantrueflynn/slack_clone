import React from 'react';
import MessageThread from '../Message/MessageThread';
import ChannelPageContainer from './ChannelPageContainer';
import ChannelPage from './ChannelPage';

class ChannelRightSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.handleCloseSidebar = this.handleCloseSidebar.bind(this);
  }

  componentDidMount() {
    const { openRightSidebar, messageSlug } = this.props;
    
    if (messageSlug) {
      openRightSidebar('Thread', { messageSlug });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.messageSlug !== prevProps.messageSlug) {
      this.props.openRightSidebar(
        'Thread',
        { messageSlug: this.props.messageSlug }
      );
    }
  }

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
          <h4>{rightSidebar.sidebarType}</h4>
          <button onClick={this.handleCloseSidebar}>&#10006;</button>
        </header>

        {message && rightSidebar.sidebarType === 'Thread' && (
          <MessageThread message={message} threadEntries={threadEntries} />
        )}
        {favorites && rightSidebar.sidebarType === 'Favorites' && (
          <ul>
            {favorites.map(fav => (
              <li key={fav.id}>
                id: {fav.id}<br/>
                messageId: {fav.messageId}<br/>
                userId: {fav.userId}
              </li>
            ))}
          </ul>
        )}
      </aside>
    );
  }
}

export default ChannelRightSidebar;
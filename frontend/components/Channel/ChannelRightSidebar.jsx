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
      openRightSidebar({ messageSlug });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.messageSlug !== prevProps.messageSlug) {
      this.props.openRightSidebar({ messageSlug: this.props.messageSlug });
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
      threadEntries
    } = this.props;

    if (!isRightSidebarOpen) {
      return null;
    }

    return (
      <aside className="channel-right-sidebar">
        <header className="channel-right-sidebar__header">
          <span className="h4">{rightSidebar.sidebarProps.title}</span>
          <button onClick={this.handleCloseSidebar}>&#10006;</button>
        </header>

        {message && (
          <MessageThread message={message} threadEntries={threadEntries} />
        )}
      </aside>
    );
  }
}

export default ChannelRightSidebar;
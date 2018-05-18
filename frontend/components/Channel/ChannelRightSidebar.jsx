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
    const { openRightSidebar, match: { params } } = this.props;
    
    if (params.messageSlug) {
      openRightSidebar({ messageSlug: params.messageSlug });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.messageSlug !== nextProps.messageSlug) {
      this.props.openRightSidebar({ messageSlug: nextProps.messageSlug });
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
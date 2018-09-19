import React from 'react';
import EmojiModalContainer from './EmojiModalContainer';
import LeftSidebarContainer from './LeftSidebarContainer';
import { RouteWithSubRoutes } from '../util/routeUtil';
import ChannelHeader from './ChannelHeader';
import AllUnreadsContainer from './AllUnreadsContainer';
import AllThreadsContainer from './AllThreadsContainer';
import ChannelContainer from './ChannelContainer';
import './ChatPage.css';

class ChatPage extends React.Component {
  componentWillMount() {
    const { history } = this.props;

    if (this.selectRedirectUrl()) {
      history.push(this.selectRedirectUrl());
    }
  }

  componentDidMount() {
    const { fetchEntriesRequest, isWorkspaceLoaded } = this.props;

    if (isWorkspaceLoaded) {
      fetchEntriesRequest();
    }
  }

  componentDidUpdate(prevProps) {
    const {
      history,
      fetchEntriesRequest,
      rightSidebarClose,
      chatPath,
      location: { pathname },
    } = this.props;

    if (prevProps.location.pathname !== pathname) {
      fetchEntriesRequest(chatPath);
    }

    if (this.selectRedirectUrl()) {
      history.push(this.selectRedirectUrl());
    }

    if (!chatPath && prevProps.chatPath) {
      rightSidebarClose();
    }
  }

  selectRedirectUrl() {
    const { rightSidebarProps, match: { url, isExact } } = this.props;

    if (isExact && rightSidebarProps) {
      if (rightSidebarProps && rightSidebarProps.path) {
        return url + rightSidebarProps.path;
      }
    }

    return null;
  }

  render() {
    const {
      isWorkspaceLoaded,
      routes,
      rightSidebarClose,
      chatTitle,
      isRightSidebarOpen,
      users,
    } = this.props;

    if (!isWorkspaceLoaded) {
      return null;
    }

    let chatClassNames = 'ChatPage';
    if (isRightSidebarOpen) chatClassNames += ' ChatPage--sidebar-open';

    return (
      <div className={chatClassNames}>
        <LeftSidebarContainer />
        <div className="ChatPage__body">
          <ChannelHeader sectionTitle={chatTitle} rightSidebarClose={rightSidebarClose} />
          <div className="ChatPage__row">
            <div className="ChatPage__container">
              <EmojiModalContainer />
              <AllUnreadsContainer authors={users} />
              <AllThreadsContainer users={users} />
              <ChannelContainer chatTitle={chatTitle} authors={users} />
            </div>
            {routes.map(route => (
              <RouteWithSubRoutes key={route.path} {...route} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ChatPage;

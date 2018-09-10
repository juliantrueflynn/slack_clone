import React from 'react';
import EmojiModalContainer from './EmojiModalContainer';
import LeftSidebarContainer from './LeftSidebarContainer';
import { RouteWithSubRoutes } from '../util/routeUtil';
import ChannelHeader from './ChannelHeader';
import './ChannelPage.css';

class ChatPage extends React.Component {
  componentDidMount() {
    const {
      history,
      fetchEntriesRequest,
      isWorkspaceLoaded,
    } = this.props;

    if (isWorkspaceLoaded) {
      fetchEntriesRequest();
    }

    if (this.selectRedirectUrl()) {
      history.push(this.selectRedirectUrl());
    }
  }

  componentDidUpdate(prevProps) {
    const {
      history,
      fetchEntriesRequest,
      rightSidebarClose,
      location: { pathname },
      match: { params: { chatPath } },
    } = this.props;

    if (pathname !== prevProps.location.pathname) {
      fetchEntriesRequest(chatPath);
    }

    if (this.selectRedirectUrl()) {
      history.push(this.selectRedirectUrl());
    }

    if (!chatPath && prevProps.match.params.chatPath) {
      rightSidebarClose();
    }
  }

  selectRedirectUrl() {
    const { rightSidebar, isRightSidebarOpen, match: { url, isExact } } = this.props;

    if (isExact && isRightSidebarOpen) {
      const { sidebarProps } = rightSidebar;

      if (sidebarProps && sidebarProps.path) {
        return url + sidebarProps.path;
      }
    }

    return null;
  }

  render() {
    const {
      entries,
      isWorkspaceLoaded,
      routes,
      rightSidebarClose,
      chatTitle,
    } = this.props;

    if (!isWorkspaceLoaded) return null;

    return (
      <div className="ChannelPage">
        <LeftSidebarContainer />
        <div className="ChannelPage__body">
          <ChannelHeader sectionTitle={chatTitle} rightSidebarClose={rightSidebarClose} />
          <div className="ChannelPage__row">
            <div className="ChannelPage__container">
              <EmojiModalContainer />
              {entries && entries.map(entry => (
                <div key={entry.id}>
                  {entry.id}
                </div>
              ))}
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

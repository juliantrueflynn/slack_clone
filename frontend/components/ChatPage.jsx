import React from 'react';
import { Switch } from 'react-router-dom';
import ChannelHeader from './ChannelHeader';
import { RouteWithSubRoutes } from '../util/routeUtil';
import AllUnreads from './AllUnreads';
import AllThreads from './AllThreads';
import Channel from './Channel';
import './ChatPage.css';

class ChatPage extends React.Component {
  componentDidMount() {
    const { isWorkspaceLoaded, history } = this.props;

    if (isWorkspaceLoaded) {
      this.loadPageData();
    }

    if (this.selectRedirectUrl()) {
      history.push(this.selectRedirectUrl());
    }
  }

  componentDidUpdate(prevProps) {
    const { history, location: { pathname } } = this.props;

    if (prevProps.location.pathname !== pathname) {
      this.loadPageData();
    }

    if (this.selectRedirectUrl()) {
      history.push(this.selectRedirectUrl());
    }
  }

  loadPageData() {
    const { chatPath, loadChatPage, fetchEntriesRequest } = this.props;
    loadChatPage(chatPath);
    fetchEntriesRequest(chatPath);
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
      chatPath,
      routes,
      rightSidebarClose,
      chatTitle,
      users,
      channels,
      currentUser,
      isLoading,
      clearUnreads,
      messages,
    } = this.props;

    if (!isWorkspaceLoaded) {
      return null;
    }

    let chatClassNames = 'ChatPage';
    if (chatPath === 'unreads' || chatPath === 'threads') {
      chatClassNames += ` ChatPage--${chatPath}`;
    } else {
      chatClassNames += ' ChatPage--channel';
    }
    if (isLoading) chatClassNames += ' ChatPage--loading';

    return (
      <div className={chatClassNames}>
        <ChannelHeader sectionTitle={chatTitle} rightSidebarClose={rightSidebarClose} />
        <div className="ChatPage__row">
          <div className="ChatPage__container">
            {isLoading && (
              <div className="ChatPage__loader">
                Messages loading...
              </div>
            )}
            <AllUnreads
              chatPath={chatPath}
              authors={users}
              unreadChannels={channels}
              clearUnreads={clearUnreads}
              isLoading={isLoading}
              messages={messages}
            />
            <AllThreads
              chatPath={chatPath}
              users={users}
              channels={channels}
              currentUser={currentUser}
              isLoading={isLoading}
              messages={messages}
            />
            <Channel
              chatPath={chatPath}
              chatTitle={chatTitle}
              authors={users}
              channels={channels}
              currentUser={currentUser}
              isLoading={isLoading}
              messages={messages}
            />
          </div>
          <Switch>
            {routes.map(route => (
              <RouteWithSubRoutes key={route.path} {...route} />
            ))}
          </Switch>
        </div>
      </div>
    );
  }
}

export default ChatPage;

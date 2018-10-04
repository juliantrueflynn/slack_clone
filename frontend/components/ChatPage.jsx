import React from 'react';
import { Switch } from 'react-router-dom';
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
    const { history, match: { url } } = this.props;

    if (url !== prevProps.match.url) {
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
    const {
      drawerType,
      drawerSlug,
      match: { url, isExact }
    } = this.props;

    if (isExact && drawerType) {
      if (drawerSlug) {
        return `${url}/${drawerType}/${drawerSlug}`;
      }

      return `${url}/${drawerType}`;
    }

    return null;
  }

  render() {
    const {
      isWorkspaceLoaded,
      chatPath,
      routes,
      messages,
      users,
      channels,
      currentUser,
      isLoading,
      clearUnreads,
      fetchHistoryRequest,
    } = this.props;

    if (!isWorkspaceLoaded) {
      return null;
    }

    let chatType;
    const channel = channels[chatPath];
    if (channel) {
      chatType = 'channel';
    }

    if (chatPath === 'unreads' || chatPath === 'threads') {
      chatType = chatPath;
    }

    let chatClassNames = 'ChatPage';
    if (chatType) chatClassNames += ` ChatPage--${chatType}`;
    if (isLoading) chatClassNames += ' ChatPage--loading';
    if (!messages.length) chatClassNames += ' ChatPage--empty';

    return (
      <div className={chatClassNames}>
        <div className="ChatPage__row">
          <div className="ChatPage__container">
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
              convos={messages}
            />
            <Channel
              channel={channel}
              authors={users}
              currentUser={currentUser}
              isLoading={isLoading}
              messages={messages}
              fetchHistoryRequest={fetchHistoryRequest}
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

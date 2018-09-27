import React from 'react';
import { Switch } from 'react-router-dom';
import { RouteWithSubRoutes } from '../util/routeUtil';
import ChatPageBody from './ChatPageBody';
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

    let chatType = 'channel';
    if (chatPath === 'unreads' || chatPath === 'threads') {
      chatType = chatPath;
    }

    let chatClassNames = `ChatPage ChatPage--${chatType}`;
    if (isLoading) {
      chatClassNames += ' ChatPage--loading';
    }

    return (
      <div className={chatClassNames}>
        <div className="ChatPage__row">
          <ChatPageBody
            chatPath={chatPath}
            chatType={chatType}
            chatTitle={chatTitle}
            messages={messages}
            channels={channels}
            users={users}
            clearUnreads={clearUnreads}
            isLoading={isLoading}
            currentUser={currentUser}
          />
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

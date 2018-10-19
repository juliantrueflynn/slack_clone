import React from 'react';
import { Switch } from 'react-router-dom';
import classNames from 'classnames';
import { RouteWithSubRoutes } from '../util/routeUtil';
import ChatPage from './ChatPage';
import AllUnreads from './AllUnreads';
import AllThreads from './AllThreads';
import Channel from './Channel';

class ChatPageSwitch extends React.Component {
  componentDidMount() {
    const { history } = this.props;

    this.loadPageData();

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
      history.replace(this.selectRedirectUrl());
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
      chatPath,
      routes,
      messages,
      users,
      channels,
      currentUser,
      isLoading,
      clearUnreads,
      fetchHistoryRequest,
      createChannelSubRequest,
      switchChannel,
    } = this.props;

    let chatType;
    const channel = channels[chatPath];
    if (channel) {
      chatType = 'channel';
    }

    if (chatPath === 'unreads' || chatPath === 'threads') {
      chatType = chatPath;
    }

    const pageClassNames = classNames('ChatPage', {
      [`ChatPage--${chatType}`]: chatType,
      'ChatPage--loading': isLoading,
    });

    const childRoutes = (
      <Switch>
        {routes.map(route => <RouteWithSubRoutes key={route.path} {...route} />)}
      </Switch>
    );

    return (
      <ChatPage classNames={pageClassNames} childRoutes={childRoutes}>
        {chatPath === 'unreads' && (
          <AllUnreads
            messages={messages}
            users={users}
            isLoading={isLoading}
            channels={channels}
            clearUnreads={clearUnreads}
          />
        )}
        {chatPath === 'threads' && (
          <AllThreads
            messages={messages}
            users={users}
            isLoading={isLoading}
            channels={channels}
            currentUser={currentUser}
          />
        )}
        {channel && (
          <Channel
            messages={messages}
            users={users}
            isLoading={isLoading}
            channel={channel}
            currentUserSlug={currentUser.slug}
            fetchHistoryRequest={fetchHistoryRequest}
            switchChannel={switchChannel}
            createChannelSubRequest={createChannelSubRequest}
          />
        )}
      </ChatPage>
    );
  }
}

export default ChatPageSwitch;

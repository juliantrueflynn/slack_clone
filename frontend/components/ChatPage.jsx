import React from 'react';
import { Switch } from 'react-router-dom';
import classNames from 'classnames';
import { RouteWithSubRoutes } from '../util/routeUtil';
import ChannelHeaderContainer from './ChannelHeaderContainer';
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
      createChannelSubRequest,
      switchChannel,
      entries,
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

    const pageClassNames = classNames('ChatPage', {
      [`ChatPage--${chatType}`]: chatType,
      'ChatPage--loading': isLoading,
      'ChatPage--empty': !messages.length,
    });

    return (
      <div className={pageClassNames}>
        <ChannelHeaderContainer />
        <div className="ChatPage__row">
          <div className="ChatPage__container">
            {chatPath === 'unreads' && (
              <AllUnreads
                chatPath={chatPath}
                authors={users}
                channels={channels}
                clearUnreads={clearUnreads}
                isLoading={isLoading}
                messages={messages}
              />
            )}
            {chatPath === 'threads' && (
              <AllThreads
                chatPath={chatPath}
                users={users}
                channels={channels}
                currentUser={currentUser}
                isLoading={isLoading}
                messages={messages}
              />
            )}
            {channel && (
              <Channel
                channel={channel}
                chatPath={chatPath}
                users={users}
                currentUserSlug={currentUser.slug}
                isLoading={isLoading}
                messages={messages}
                entries={entries}
                fetchHistoryRequest={fetchHistoryRequest}
                switchChannel={switchChannel}
                createChannelSubRequest={createChannelSubRequest}
              />
            )}
          </div>
          <Switch>
            {routes.map(route => <RouteWithSubRoutes key={route.path} {...route} />)}
          </Switch>
        </div>
      </div>
    );
  }
}

export default ChatPage;

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

    if (this.selectRedirectUrl()) {
      history.push(this.selectRedirectUrl());
    }
  }

  componentDidUpdate() {
    const { history } = this.props;

    if (this.selectRedirectUrl()) {
      history.replace(this.selectRedirectUrl());
    }
  }

  selectRedirectUrl() {
    const {
      match: { url, isExact },
      drawerType,
      drawerSlug,
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
      entitySlug: chatPath,
      routes,
      messages,
      users,
      entity: channel,
      channels,
      currentUser,
      isLoading,
      clearUnreads,
      fetchHistoryRequest,
      createChannelSubRequest,
      switchChannel,
    } = this.props;

    let chatType;
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

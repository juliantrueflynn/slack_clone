import React from 'react';
import classNames from 'classnames';
import ChatPage from './ChatPage';
import AllUnreads from './AllUnreads';
import AllThreads from './AllThreads';
import Channel from './Channel';

class ChatPageSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { scrollLoc: 0 };
    this.handleScrollLoc = this.handleScrollLoc.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;

    if (this.selectRedirectUrl()) {
      history.replace(this.selectRedirectUrl());
    }
  }

  componentDidUpdate(prevProps) {
    const {
      match: { isExact },
      drawerType,
      history,
      drawerClose,
      entitySlug,
      entity,
      switchChannel,
    } = this.props;
    const { scrollLoc } = this.state;

    if (entity && drawerType && isExact && !prevProps.isExact) {
      if (entitySlug === prevProps.entitySlug) {
        drawerClose();
        return;
      }
    }

    if (this.selectRedirectUrl()) {
      history.replace(this.selectRedirectUrl());
    }

    if (prevProps.entity && entitySlug !== prevProps.entitySlug) {
      switchChannel(prevProps.entitySlug, scrollLoc);
    }
  }

  selectRedirectUrl() {
    const {
      match: { url, isExact },
      drawerType,
      drawerSlug,
      entity: channel,
    } = this.props;

    if (isExact && drawerType === 'details' && !channel) {
      return null;
    }

    if (isExact && drawerType) {
      if (drawerSlug) {
        return `${url}/${drawerType}/${drawerSlug}`;
      }

      return `${url}/${drawerType}`;
    }

    return null;
  }

  handleScrollLoc(scrollLoc) {
    this.setState({ scrollLoc });
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
      isLoadingHistory,
      clearUnreads,
      fetchHistoryRequest,
      createChannelSubRequest,
    } = this.props;

    const user = users[currentUser.slug];

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

    return (
      <ChatPage classNames={pageClassNames} routes={routes}>
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
            currentUser={user}
          />
        )}
        {channel && (
          <Channel
            chatPath={chatPath}
            messages={messages}
            isLoading={isLoading}
            channel={channel}
            currentUser={user}
            fetchHistoryRequest={fetchHistoryRequest}
            updateScrollLoc={this.handleScrollLoc}
            isLoadingHistory={isLoadingHistory}
            createChannelSubRequest={createChannelSubRequest}
          />
        )}
      </ChatPage>
    );
  }
}

export default ChatPageSwitch;

import React from 'react';
import ChannelHeaderContainer from './ChannelHeaderContainer';
import AllUnreads from './AllUnreads';
import AllThreads from './AllThreads';
import Channel from './Channel';
import { PageRoutes } from '../util/routeUtil';
import './ChatPageSwitch.css';

class ChatPageSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isInitLoadingDone: false };
    this.getChatData = this.getChatData.bind(this);
  }

  componentDidMount() {
    const { history, updateChatPath, chatPath } = this.props;

    if (this.selectRedirectUrl()) {
      history.replace(this.selectRedirectUrl());
    }

    updateChatPath(chatPath);
    this.getChatData();
  }

  componentDidUpdate(prevProps) {
    const {
      match: { isExact },
      updateChatPath,
      drawerType,
      history,
      closeDrawer,
      chatPath,
      channel,
      isLoading,
    } = this.props;

    if (channel && drawerType && isExact && !prevProps.isExact) {
      if (chatPath === prevProps.chatPath) {
        closeDrawer();
        return;
      }
    }

    if (this.selectRedirectUrl()) {
      history.replace(this.selectRedirectUrl());
    }

    if (!isLoading.channel && prevProps.isLoading) {
      this.updateLoadingState();
    }

    if (chatPath !== prevProps.chatPath) {
      updateChatPath(chatPath);

      if (channel && channel.shouldFetch) {
        this.getChatData();
      }

      if (!channel) {
        this.getChatData();
      }
    }
  }

  getChatData() {
    const { fetchChatPageData } = this.props;
    fetchChatPageData();
  }

  updateLoadingState() {
    const { isInitLoadingDone } = this.state;

    if (!isInitLoadingDone) {
      this.setState({ isInitLoadingDone: true });
    }
  }

  selectRedirectUrl() {
    const {
      match: { url, isExact },
      drawerType,
      drawerSlug,
      channel,
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

  render() {
    const {
      chatPath,
      routes,
      messages,
      users,
      channel,
      channels,
      currentUser,
      isLoading,
      clearUnreads,
      openModal,
      updateScrollLocation,
      fetchHistoryRequest,
      createChannelSubRequest,
      createMessageRequest,
      match: { url, params: { workspaceSlug } },
    } = this.props;
    const { isInitLoadingDone } = this.state;

    let chatType = 'channel';
    if (chatPath === 'unreads' || chatPath === 'threads') {
      chatType = chatPath;
    }

    return (
      <div className={`ChatPageSwitch ChatPageSwitch__${chatType}`}>
        <ChannelHeaderContainer />
        <div className="ChatPageSwitch__row">
          <div className="ChatPageSwitch__body">
            {chatPath === 'unreads' && (
              <AllUnreads
                messagesMap={messages}
                users={users}
                isLoading={isLoading.channel}
                channels={channels}
                clearUnreads={clearUnreads}
              />
            )}
            {chatPath === 'threads' && (
              <AllThreads
                messages={messages}
                users={users}
                isLoading={isLoading.channel}
                currentUserSlug={currentUser.slug}
                workspaceSlug={workspaceSlug}
                createMessageRequest={createMessageRequest}
              />
            )}
            {channel && (
              <Channel
                messages={messages}
                isLoading={isLoading}
                channel={channel}
                currentUserSlug={currentUser.slug}
                openModal={openModal}
                fetchHistoryRequest={fetchHistoryRequest}
                createChannelSubRequest={createChannelSubRequest}
                createMessageRequest={createMessageRequest}
                updateScrollLocation={updateScrollLocation}
                matchUrl={url}
              />
            )}
          </div>
          {isInitLoadingDone && <PageRoutes routes={routes} />}
        </div>
      </div>
    );
  }
}

export default ChatPageSwitch;

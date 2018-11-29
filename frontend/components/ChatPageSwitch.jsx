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
    this.state = { scrollLoc: 0, isInitLoadingDone: false };
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
      chatPath,
      channel,
      switchChannel,
      isLoading,
    } = this.props;
    const { scrollLoc } = this.state;

    if (channel && drawerType && isExact && !prevProps.isExact) {
      if (chatPath === prevProps.chatPath) {
        drawerClose();
        return;
      }
    }

    if (this.selectRedirectUrl()) {
      history.replace(this.selectRedirectUrl());
    }

    if (prevProps.channel && chatPath !== prevProps.chatPath) {
      switchChannel(prevProps.chatPath, scrollLoc);
    }

    if (!isLoading.channel && prevProps.isLoading) {
      this.updateLoadingState();
    }
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

  handleScrollLoc(scrollLoc) {
    this.setState({ scrollLoc });
  }

  render() {
    const {
      chatPath,
      routes,
      messages,
      users,
      channel,
      channelsMap,
      currentUser,
      isLoading,
      clearUnreads,
      modalOpen,
      fetchHistoryRequest,
      createChannelSubRequest,
      workspaceSlug,
    } = this.props;
    const { isInitLoadingDone } = this.state;

    let chatType = 'channel';
    if (chatPath === 'unreads' || chatPath === 'threads') {
      chatType = chatPath;
    }

    const channels = Object.values(channelsMap);
    const unreadChannels = channels.filter(ch => ch.hasUnreads);
    const convoChannels = channels.filter(ch => !ch.hasDm).reduce((acc, curr) => {
      acc[curr.slug] = channelsMap[curr.slug];
      return acc;
    }, {});

    return (
      <div className={`ChatPageSwitch ChatPageSwitch__${chatType}`}>
        <ChannelHeaderContainer />
        <div className="ChatPageSwitch__row">
          <div className="ChatPageSwitch__body">
            {chatPath === 'unreads' && (
              <AllUnreads
                messages={messages}
                users={users}
                isLoading={isLoading.channel}
                channels={unreadChannels}
                clearUnreads={clearUnreads}
              />
            )}
            {chatPath === 'threads' && (
              <AllThreads
                messages={messages}
                users={users}
                isLoading={isLoading.channel}
                channels={convoChannels}
                currentUser={users[currentUser.slug]}
                workspaceSlug={workspaceSlug}
              />
            )}
            {channel && (
              <Channel
                messages={messages}
                isLoading={isLoading}
                channel={channel}
                currentUserSlug={currentUser.slug}
                modalOpen={modalOpen}
                fetchHistoryRequest={fetchHistoryRequest}
                updateScrollLoc={this.handleScrollLoc}
                createChannelSubRequest={createChannelSubRequest}
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

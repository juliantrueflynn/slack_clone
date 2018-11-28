import React from 'react';
import Layout from './Layout';
import ChannelHeaderContainer from './ChannelHeaderContainer';
import AllUnreads from './AllUnreads';
import AllThreads from './AllThreads';
import Channel from './Channel';
import ReactionModal from './ReactionModal';
import './ChatPageSwitch.css';

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
      modal: { modalType, modalProps },
      modalClose,
      channels,
      currentUser,
      isLoading,
      clearUnreads,
      modalOpen,
      createReactionRequest,
      fetchHistoryRequest,
      createChannelSubRequest,
    } = this.props;

    const user = users[currentUser.slug];

    let chatType = 'channel';
    if (chatPath === 'unreads' || chatPath === 'threads') {
      chatType = chatPath;
    }

    return (
      <div className="ChatPageSwitch">
        <ChannelHeaderContainer />
        <Layout layoutFor={chatType} routes={routes} isLoading={isLoading.channel} hasBodyWrapper>
          {modalType === 'MODAL_REACTION' && (
            <ReactionModal
              createReactionRequest={createReactionRequest}
              modalProps={modalProps}
              modalClose={modalClose}
            />
          )}
          {chatPath === 'unreads' && (
            <AllUnreads
              messages={messages}
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
              modalOpen={modalOpen}
              fetchHistoryRequest={fetchHistoryRequest}
              updateScrollLoc={this.handleScrollLoc}
              createChannelSubRequest={createChannelSubRequest}
            />
          )}
        </Layout>
      </div>
    );
  }
}

export default ChatPageSwitch;

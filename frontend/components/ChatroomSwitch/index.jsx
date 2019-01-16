import React from 'react';
import classNames from 'classnames';
import ChannelHeaderContainer from '../../containers/ChannelHeaderContainer';
import AllUnreads from '../AllUnreads';
import AllThreads from '../AllThreads';
import Channel from '../Channel';
import { PageRoutes } from '../../util/routeUtil';
import './styles.css';

class ChatroomSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isInitLoadingDone: false };
    this.fetchChatroomData = this.fetchChatroomData.bind(this);
    this.updateLoadingState = this.updateLoadingState.bind(this);
  }

  componentDidMount() {
    this.fetchChatroomData();
    this.updateHistoryDrawerPath();
  }

  componentDidUpdate(prevProps) {
    const {
      match: { isExact },
      drawerPath,
      closeDrawer,
      chatroomSlug,
      chatroom,
      isLoading,
    } = this.props;

    if (chatroomSlug !== prevProps.chatroomSlug) {
      this.fetchChatroomData();
    }

    if (chatroom && drawerPath && isExact && !prevProps.isExact) {
      if (chatroomSlug === prevProps.chatroomSlug) {
        closeDrawer();
        return;
      }
    }

    this.updateHistoryDrawerPath();

    if (!isLoading.chatroom && prevProps.isLoading) {
      this.updateLoadingState();
    }
  }

  fetchChatroomData() {
    const { chatroom, updateChatroomPath, fetchChatroomData } = this.props;

    updateChatroomPath();

    if (!chatroom || (chatroom && chatroom.shouldFetch)) {
      fetchChatroomData();
    }
  }

  updateHistoryDrawerPath() {
    const {
      history,
      drawerPath,
      match: { isExact, url },
    } = this.props;

    if (drawerPath && isExact) {
      history.replace(url + drawerPath);
    }
  }

  updateLoadingState() {
    const { isInitLoadingDone } = this.state;

    if (!isInitLoadingDone) {
      this.setState({ isInitLoadingDone: true });
    }
  }

  render() {
    const {
      chatroomSlug,
      routes,
      messages,
      usersMap,
      chatroom,
      chatrooms,
      currentUser,
      isLoading,
      clearAllUnread,
      createChatroomSubRequest,
      createMessageRequest,
      workspaceSlug,
    } = this.props;
    const { isInitLoadingDone } = this.state;

    let chatType = 'channel';
    if (chatroomSlug === 'unreads' || chatroomSlug === 'threads') {
      chatType = chatroomSlug;
    }

    const pageClassNames = classNames('ChatroomSwitch', {
      [`ChatroomSwitch__${chatType}`]: chatType,
      'ChatroomSwitch__channel--dm': chatroom && chatroom.hasDm,
      'ChatroomSwitch__channel--public': chatroom && !chatroom.hasDm,
    });

    return (
      <div className={pageClassNames}>
        <ChannelHeaderContainer />
        <div className="ChatroomSwitch__row">
          <div className="ChatroomSwitch__body">
            {chatroomSlug === 'unreads' && (
              <AllUnreads
                messagesMap={messages}
                isLoading={isLoading}
                chatrooms={chatrooms}
                clearAllUnread={clearAllUnread}
              />
            )}
            {chatroomSlug === 'threads' && (
              <AllThreads
                messages={messages}
                usersMap={usersMap}
                isLoading={isLoading}
                currentUserSlug={currentUser.slug}
                workspaceSlug={workspaceSlug}
                createMessageRequest={createMessageRequest}
              />
            )}
            {chatroom && (
              <Channel
                isLoading={isLoading}
                chatroom={chatroom}
                createChatroomSubRequest={createChatroomSubRequest}
                createMessageRequest={createMessageRequest}
              />
            )}
          </div>
          {isInitLoadingDone && <PageRoutes routes={routes} />}
        </div>
      </div>
    );
  }
}

export default ChatroomSwitch;

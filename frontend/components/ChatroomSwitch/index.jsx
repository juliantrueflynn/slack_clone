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
      chatPath,
      chatroom,
      isLoading,
    } = this.props;

    if (chatPath !== prevProps.chatPath) {
      this.fetchChatroomData();
    }

    if (chatroom && drawerPath && isExact && !prevProps.isExact) {
      if (chatPath === prevProps.chatPath) {
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
    const { chatroom, updateChatPath, fetchChatPageData } = this.props;

    updateChatPath();

    if (!chatroom || (chatroom && chatroom.shouldFetch)) {
      fetchChatPageData();
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
      chatPath,
      routes,
      messages,
      usersMap,
      chatroom,
      chatrooms,
      currentUser,
      isLoading,
      clearAllUnread,
      openModal,
      updateScrollLocation,
      fetchHistoryRequest,
      createChatroomSubRequest,
      createMessageRequest,
      match: { url, params: { workspaceSlug } },
    } = this.props;
    const { isInitLoadingDone } = this.state;

    let chatType = 'channel';
    if (chatPath === 'unreads' || chatPath === 'threads') {
      chatType = chatPath;
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
            {chatPath === 'unreads' && (
              <AllUnreads
                messagesMap={messages}
                isLoading={isLoading.chatroom}
                chatrooms={chatrooms}
                clearAllUnread={clearAllUnread}
              />
            )}
            {chatPath === 'threads' && (
              <AllThreads
                messages={messages}
                usersMap={usersMap}
                isLoading={isLoading.chatroom}
                currentUserSlug={currentUser.slug}
                workspaceSlug={workspaceSlug}
                createMessageRequest={createMessageRequest}
              />
            )}
            {chatroom && (
              <Channel
                messages={messages}
                isLoading={isLoading}
                chatroom={chatroom}
                currentUserSlug={currentUser.slug}
                openModal={openModal}
                fetchHistoryRequest={fetchHistoryRequest}
                createChatroomSubRequest={createChatroomSubRequest}
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

export default ChatroomSwitch;

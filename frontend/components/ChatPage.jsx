import React from 'react';
import EmojiModalContainer from './EmojiModalContainer';
import LeftSidebarContainer from './LeftSidebarContainer';
import { RouteWithSubRoutes } from '../util/routeUtil';
import ChannelHeader from './ChannelHeader';
import ChannelPage from './ChannelPage';
import AllThreads from './AllThreads';
import AllUnreads from './AllUnreads';
import './ChatPage.css';

class ChatPage extends React.Component {
  componentWillMount() {
    const { history } = this.props;

    if (this.selectRedirectUrl()) {
      history.push(this.selectRedirectUrl());
    }
  }

  componentDidMount() {
    const { fetchEntriesRequest, isWorkspaceLoaded } = this.props;

    if (isWorkspaceLoaded) {
      fetchEntriesRequest();
    }
  }

  componentDidUpdate(prevProps) {
    const {
      history,
      fetchEntriesRequest,
      rightSidebarClose,
      location: { pathname },
      match: { params: { chatPath } },
    } = this.props;

    if (prevProps.location.pathname !== pathname) {
      fetchEntriesRequest(chatPath);
    }

    if (this.selectRedirectUrl()) {
      history.push(this.selectRedirectUrl());
    }

    if (!chatPath && prevProps.match.params.chatPath) {
      rightSidebarClose();
    }
  }

  selectRedirectUrl() {
    const { rightSidebarProps, match: { url, isExact } } = this.props;

    if (isExact && rightSidebarProps) {
      if (rightSidebarProps && rightSidebarProps.path) {
        return url + rightSidebarProps.path;
      }
    }

    return null;
  }

  render() {
    const {
      match: { params: { chatPath } },
      messages,
      isWorkspaceLoaded,
      routes,
      rightSidebarClose,
      chatTitle,
      isRightSidebarOpen,
      channel,
      users,
      currentUser,
      channels,
      createChannelSubRequest,
    } = this.props;

    if (!isWorkspaceLoaded || !channel) {
      return null;
    }

    let chatClassNames = 'ChatPage';
    if (isRightSidebarOpen) chatClassNames += ' ChatPage--sidebar-open';

    return (
      <div className={chatClassNames}>
        <LeftSidebarContainer />
        <div className="ChatPage__body">
          <ChannelHeader sectionTitle={chatTitle} rightSidebarClose={rightSidebarClose} />
          <div className="ChatPage__row">
            <div className="ChatPage__container">
              <EmojiModalContainer />
              <AllUnreads
                messages={messages}
                authors={users}
                chatPath={chatPath}
                channels={channels}
              />
              <AllThreads
                chatPath={chatPath}
                messages={messages}
                users={users}
                currentUser={currentUser}
                channels={channels}
                channelId={channel.id}
              />
              <ChannelPage
                channel={channel}
                messages={messages}
                chatTitle={chatTitle}
                authors={users}
                currentUserSlug={currentUser.slug}
                createChannelSubRequest={createChannelSubRequest}
              />
            </div>
            {routes.map(route => (
              <RouteWithSubRoutes key={route.path} {...route} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ChatPage;

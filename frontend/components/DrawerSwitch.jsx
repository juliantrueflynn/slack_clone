import React from 'react';
import Drawer from './Drawer';
import UserDrawer from './UserDrawer';
import FavoritesDrawer from './FavoritesDrawer';
import MessageThreadDrawer from './MessageThreadDrawer';
import ChannelDetailsDrawer from './ChannelDetailsDrawer';

class DrawerSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    const { openDrawer, drawerType, drawerSlug } = this.props;

    openDrawer({ drawerType, drawerSlug });
  }

  componentDidUpdate(prevProps) {
    const { drawerType, fetchEntityRequest } = this.props;

    if (drawerType && drawerType !== prevProps.drawerType) {
      fetchEntityRequest();
    }
  }

  getMessages(type) {
    const { messagesMap, chatPath, favorites } = this.props;

    const messages = Object.values(messagesMap);

    if (type === 'details') {
      return messages.filter(msg => msg.pinId && msg.channelSlug === chatPath);
    }

    if (type === 'favorites') {
      return favorites.sort((a, b) => (
        new Date(b.createdAt) - new Date(a.createdAt)
      )).map(msg => messagesMap[msg.messageSlug]);
    }

    return messagesMap;
  }

  getChannel() {
    const { channelsMap, chatPath } = this.props;
    return channelsMap[chatPath];
  }

  getDrawerTitle() {
    const { drawerType } = this.props;

    let title;
    switch (drawerType) {
      case 'favorites':
        title = 'Starred items';
        break;
      case 'convo':
        title = 'Thread';
        break;
      case 'team':
        title = 'Workspace directory';
        break;
      case 'details': {
        const channel = this.getChannel();
        if (channel && !channel.hasDm) {
          title = `About #${channel.title}`;
        }

        if (channel && channel.hasDm) {
          title = 'About this conversation';
        }

        break;
      }
      default: break;
    }

    return title;
  }

  handleClose() {
    const {
      closeDrawer,
      history,
      match: { params: { 0: drawerParent, workspaceSlug } },
    } = this.props;

    closeDrawer();
    history.replace(`/${workspaceSlug}/${drawerParent}`);
  }

  render() {
    const {
      drawerSlug,
      drawerType,
      users,
      isLoading,
      currentUser,
      accordion,
      createChannelRequest,
      destroyPinRequest,
      modalOpen,
    } = this.props;

    const channel = this.getChannel();

    if (drawerType === 'details' && !channel) {
      return null;
    }

    const messages = this.getMessages(drawerType);

    return (
      <Drawer
        isLoading={isLoading.drawer}
        drawerType={drawerType}
        drawerTitle={this.getDrawerTitle()}
        closeDrawer={this.handleClose}
        messages={messages}
        currentUserSlug={currentUser.slug}
      >
        {drawerType === 'team' && (
          <UserDrawer
            userSlug={drawerSlug}
            currentUser={currentUser}
            users={users}
            createChannelRequest={createChannelRequest}
            modalOpen={modalOpen}
          />
        )}
        {drawerType === 'favorites' && (
          <FavoritesDrawer messages={messages} users={users} />
        )}
        {drawerType === 'convo' && (
          <MessageThreadDrawer messages={messages} users={users} />
        )}
        {(drawerType === 'details' && channel) && (
          <ChannelDetailsDrawer
            messages={messages}
            users={users}
            currentUserId={currentUser.id}
            channel={channel}
            accordion={accordion}
            isLoading={isLoading.drawer}
            destroyPinRequest={destroyPinRequest}
            modalOpen={modalOpen}
          />
        )}
      </Drawer>
    );
  }
}

export default DrawerSwitch;

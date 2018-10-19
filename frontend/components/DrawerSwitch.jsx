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
    const {
      openDrawer,
      fetchEntitiesRequest,
      drawerType,
      drawerSlug,
    } = this.props;

    openDrawer({ drawerType, drawerSlug });
    fetchEntitiesRequest();
  }

  componentDidUpdate(prevProps) {
    const {
      location: { pathname },
      openDrawer,
      fetchEntitiesRequest,
      drawerType,
      drawerSlug,
    } = this.props;

    if (pathname !== prevProps.location.pathname) {
      openDrawer({ drawerType, drawerSlug });

      if (drawerSlug !== prevProps.drawerSlug) {
        fetchEntitiesRequest();
      }

      if (prevProps.drawerType && drawerType !== prevProps.drawerType) {
        fetchEntitiesRequest();
      }
    }
  }

  handleClose() {
    const {
      closeDrawer,
      history,
      match: { params: { 0: pagePath, chatPath, workspaceSlug } },
    } = this.props;

    let chatPagePath = pagePath;
    if (chatPath) {
      chatPagePath += `/${chatPath}`;
    }

    closeDrawer();
    history.push(`/${workspaceSlug}/${chatPagePath}`);
  }

  render() {
    const {
      drawerType,
      drawerSlug,
      messages,
      members,
      channel,
      isLoading,
      currentUser,
      accordion,
      openProfileModal,
      createChannelRequest,
    } = this.props;

    if (drawerType === 'details' && !channel) {
      return null;
    }

    return (
      <Drawer drawerType={drawerType} closeDrawer={this.handleClose} channel={channel}>
        {drawerType === 'team' && (
          <UserDrawer
            userSlug={drawerSlug}
            currentUser={currentUser}
            members={members}
            openProfileModal={openProfileModal}
            createChannelRequest={createChannelRequest}
          />
        )}
        {drawerType === 'favorites' && (
          <FavoritesDrawer messages={messages} members={members} />
        )}
        {drawerType === 'convo' && (
          <MessageThreadDrawer
            messages={messages}
            members={members}
            isLoading={isLoading}
            currentUser={currentUser}
          />
        )}
        {(drawerType === 'details' && channel) && (
          <ChannelDetailsDrawer
            users={members}
            channel={channel}
            accordion={accordion}
          />
        )}
      </Drawer>
    );
  }
}

export default DrawerSwitch;

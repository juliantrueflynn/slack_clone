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
    const { openDrawer, drawerType, entitySlug: drawerSlug } = this.props;

    openDrawer({ drawerType, drawerSlug });
  }

  componentDidUpdate(prevProps) {
    const {
      match: { url },
      fetchEntityRequest,
      openDrawer,
      drawerType,
      entitySlug: drawerSlug,
    } = this.props;

    if (url !== prevProps.match.url) {
      if (prevProps.drawerType && drawerType !== prevProps.drawerType) {
        openDrawer({ drawerType, drawerSlug });
        fetchEntityRequest();
      }
    }
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
      entitySlug: drawerSlug,
      drawerType,
      messages,
      users,
      channel,
      isLoading,
      currentUser,
      accordion,
      openProfileModal,
      createChannelRequest,
      destroyPinRequest,
      modalOpen,
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
            users={users}
            openProfileModal={openProfileModal}
            createChannelRequest={createChannelRequest}
          />
        )}
        {drawerType === 'favorites' && (
          <FavoritesDrawer messages={messages} users={users} />
        )}
        {drawerType === 'convo' && (
          <MessageThreadDrawer
            messages={messages}
            users={users}
            isLoading={isLoading}
            currentUser={currentUser}
          />
        )}
        {(drawerType === 'details' && channel) && (
          <ChannelDetailsDrawer
            users={users}
            messages={messages}
            channel={channel}
            accordion={accordion}
            isLoading={isLoading}
            destroyPinRequest={destroyPinRequest}
            modalOpen={modalOpen}
          />
        )}
      </Drawer>
    );
  }
}

export default DrawerSwitch;

import React from 'react';
import Drawer from './Drawer';
import UserDrawer from './UserDrawer';
import FavoritesDrawer from './FavoritesDrawer';
import MessageThreadDrawer from './MessageThreadDrawer';
import ChannelDetailsDrawer from './ChannelDetailsDrawer';

class DrawerSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isModalOpen: false };
    this.handleClose = this.handleClose.bind(this);
    this.handleMobileModalToggle = this.handleMobileModalToggle.bind(this);
  }

  componentDidMount() {
    const { openDrawer, isMobileSize } = this.props;

    openDrawer();

    if (isMobileSize) {
      this.handleMobileModalToggle(true);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      drawerType,
      drawerSlug,
      openDrawer,
      channel,
      isMobileSize
    } = this.props;
    const { isModalOpen } = this.state;

    if (drawerType !== prevProps.drawerType || drawerSlug !== prevProps.drawerSlug) {
      openDrawer();
    }

    if (drawerType === 'details' && !prevProps.channel && channel) {
      openDrawer();
    }

    if (!isModalOpen && isMobileSize) {
      this.handleMobileModalToggle(true);
    }

    if (isModalOpen && !isMobileSize) {
      this.handleMobileModalToggle(false);
    }
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
        const { channel } = this.props;
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

  handleMobileModalToggle(isModalOpen) {
    this.setState({ isModalOpen });
  }

  handleClose() {
    const {
      closeDrawer,
      history,
      match: { params: { 0: drawerParent, workspaceSlug } },
      isMobileSize,
    } = this.props;

    if (isMobileSize) {
      this.handleMobileModalToggle(false);
    }

    closeDrawer();
    history.replace(`/${workspaceSlug}/${drawerParent}`);
  }

  render() {
    const {
      drawerSlug,
      drawerType,
      channel,
      messages,
      users,
      isLoading,
      currentUser,
      accordion,
      openModal,
      history,
      createChannelRequest,
      destroyPinRequest,
      createMessageRequest,
      match: { params: { workspaceSlug } },
    } = this.props;
    const { isModalOpen } = this.state;

    if (drawerType === 'details' && !channel) {
      return null;
    }

    const currentUserSlug = currentUser.slug;
    const drawers = [
      {
        component: UserDrawer,
        path: 'team',
        createChannelRequest,
        history,
        workspaceSlug,
        currentUserSlug,
        openModal,
        user: users[drawerSlug],
        users,
      },
      { component: FavoritesDrawer, path: 'favorites' },
      { component: MessageThreadDrawer, path: 'convo', createMessageRequest },
      {
        component: ChannelDetailsDrawer,
        path: 'details',
        channel,
        accordion,
        isLoading,
        destroyPinRequest,
        currentUserSlug,
        openModal,
        users,
      },
    ];

    return drawers
      .filter(drawer => drawer.path === drawerType)
      .map(({ component: Component, path, ...props }) => (
        <Drawer
          key={path}
          isLoading={isLoading}
          drawerType={drawerType}
          drawerTitle={this.getDrawerTitle()}
          closeDrawer={this.handleClose}
          messages={messages}
          isModalOpen={isModalOpen}
          children={drawerProps => (
            <Component {...props} {...drawerProps} />
          )}
        />
      ));
  }
}

export default DrawerSwitch;

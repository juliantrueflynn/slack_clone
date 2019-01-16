import React from 'react';
import Drawer from '../Drawer';
import DrawerUser from '../DrawerUser';
import DrawerFavorites from '../DrawerFavorites';
import DrawerConvo from '../DrawerConvo';
import DrawerChannelDetails from '../DrawerChannelDetails';

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
      chatroom,
      isMobileSize
    } = this.props;
    const { isModalOpen } = this.state;

    if (drawerType !== prevProps.drawerType || drawerSlug !== prevProps.drawerSlug) {
      openDrawer();
    }

    if (drawerType === 'details' && !prevProps.chatroom && chatroom) {
      openDrawer();
    }

    if (!isModalOpen && isMobileSize) {
      this.handleMobileModalToggle(true);
    }

    if (isModalOpen && !isMobileSize) {
      this.handleMobileModalToggle(false);
    }
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
      drawerTitle,
      drawerSlug,
      drawerType,
      chatroom,
      messages,
      usersMap,
      isLoading,
      currentUser,
      accordion,
      openModal,
      history,
      createChatroomRequest,
      destroyPinRequest,
      match: { params: { workspaceSlug } },
    } = this.props;
    const { isModalOpen } = this.state;

    if (drawerType === 'details' && !chatroom) {
      return null;
    }

    const currentUserSlug = currentUser.slug;
    const drawers = [
      {
        component: DrawerUser,
        path: 'team',
        createChatroomRequest,
        history,
        isLoading,
        workspaceSlug,
        currentUserSlug,
        openModal,
        user: usersMap[drawerSlug],
        usersMap,
      },
      { component: DrawerFavorites, path: 'favorites' },
      { component: DrawerConvo, path: 'convo' },
      {
        component: DrawerChannelDetails,
        path: 'details',
        chatroom,
        accordion,
        isLoading,
        destroyPinRequest,
        currentUserSlug,
        openModal,
        usersMap,
      },
    ];

    return drawers
      .filter(drawer => drawer.path === drawerType)
      .map(({ component: Component, path, ...props }) => (
        <Drawer
          key={path}
          isLoading={isLoading}
          drawerType={drawerType}
          drawerTitle={drawerTitle}
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

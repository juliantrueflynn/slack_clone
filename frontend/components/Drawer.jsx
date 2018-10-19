import React from 'react';
import classNames from 'classnames';
import UserDrawer from './UserDrawer';
import FavoritesDrawer from './FavoritesDrawer';
import MessageThreadDrawer from './MessageThreadDrawer';
import ChannelDetailsDrawer from './ChannelDetailsDrawer';
import Button from './Button';
import './Drawer.css';

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

  getDrawerTitle() {
    const { drawerType } = this.props;

    switch (drawerType) {
      case 'favorites':
        return 'Starred items';
      case 'convo':
        return 'Thread';
      case 'team':
        return 'Workspace directory';
      case 'details': {
        const { channel } = this.props;
        return `About #${channel.title}`;
      }
      default:
        return null;
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
      createChannelRequest,
      accordion,
    } = this.props;

    const drawerClassNames = classNames('Drawer', {
      [`Drawer__${drawerType}`]: drawerType,
      Drawer__loading: isLoading,
    });

    return (
      <aside className={drawerClassNames}>
        <header className="Drawer__header">
          <div className="Drawer__headings">
            {this.getDrawerTitle()}
          </div>
          <Button unStyled buttonFor="close" onClick={this.handleClose}>
            &#10006;
          </Button>
        </header>
        <div className="Drawer__body">
          {drawerType === 'team' && (
            <UserDrawer
              userSlug={drawerSlug}
              createChannelRequest={createChannelRequest}
              currentUser={currentUser}
              members={members}
            />
          )}
          {drawerType === 'favorites' && (
            <FavoritesDrawer messages={messages} members={members} />
          )}
          {(drawerType === 'convo' && !isLoading) && (
            <MessageThreadDrawer
              messages={messages}
              members={members}
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
        </div>
      </aside>
    );
  }
}

export default DrawerSwitch;

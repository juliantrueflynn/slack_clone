import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StatusIcon from './StatusIcon';
import Button from './Button';
import LeftSidebarWidgets from './LeftSidebarWidgets';
import SuffixButton from './SuffixButton';
import ProfileDropdownTrigger from './ProfileDropdownTrigger';
import Menu from './Menu';
import ScrollBar from './ScrollBar';
import Modal from './Modal';
import './LeftSidebar.css';

class LeftSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.handleDmUnsubClick = this.handleDmUnsubClick.bind(this);
    this.handleHistoryPush = this.handleHistoryPush.bind(this);
  }

  handleDmUnsubClick(e, channelSlug) {
    e.preventDefault();

    const { updateChannelSubRequest } = this.props;
    updateChannelSubRequest(channelSlug);
  }

  handleHistoryPush(linkUrl) {
    const {
      match: { url },
      drawer: { drawerType, drawerSlug },
      history,
      isModalOpen,
      closeModal,
    } = this.props;

    let menuUrl = `${url}/${linkUrl}`;
    if (drawerType && drawerType !== 'details') {
      menuUrl += `/${drawerType}`;

      if (drawerSlug) {
        menuUrl += `/${drawerSlug}`;
      }
    }

    if (isModalOpen) {
      closeModal();
    }

    history.push(menuUrl);
  }

  render() {
    const {
      dmChannels,
      subbedChannels,
      hasUnreadChannels,
      hasUnreadConvos,
      user,
      workspace,
      closeModal,
      isModalOpen,
      workspaces,
      chatPath,
      profileUrl,
      openChannelsListModal,
      openChannelFormModal,
      windowHeight,
      isMobileSize,
    } = this.props;

    const quicklistMenuItems = [
      {
        icon: <FontAwesomeIcon icon="align-left" />,
        label: 'All Unreads',
        onClick: () => this.handleHistoryPush('unreads'),
        isOpen: chatPath === 'unreads',
        modifierClassName: hasUnreadChannels ? 'unread' : null,
      },
      {
        icon: <FontAwesomeIcon icon={['far', 'comment']} />,
        label: 'All Threads',
        onClick: () => this.handleHistoryPush('threads'),
        isOpen: chatPath === 'threads',
        modifierClassName: hasUnreadConvos ? 'unread' : null,
      },
    ];

    const channelsMenuItems = subbedChannels.map(ch => ({
      ...ch,
      icon: <FontAwesomeIcon icon="hashtag" size="sm" />,
    }));

    const dmChannelsMenuItems = dmChannels.map(({ status, ...ch }) => ({
      ...ch,
      icon: <StatusIcon member={{ status }} />,
      label: (
        <SuffixButton icon="times-circle" onClick={e => this.handleDmUnsubClick(e, ch.slug)}>
          {ch.label}
        </SuffixButton>
      ),
    }));

    const sidebarMenuItems = [
      {
        key: 'profile',
        component: ProfileDropdownTrigger,
        workspaceTitle: workspace.title,
        user,
        profileUrl,
        workspaces,
      },
      { key: 'quicklinks', component: Menu, items: quicklistMenuItems },
      {
        key: 'chats',
        component: Menu,
        items: channelsMenuItems,
        widgetTitle: (
          <SuffixButton icon="plus-circle" onClick={() => openChannelFormModal(workspace.id)}>
            <Button unStyled buttonFor="chats" onClick={openChannelsListModal}>Channels</Button>
          </SuffixButton>
        ),
      },
      {
        key: 'dm-chats',
        component: Menu,
        items: dmChannelsMenuItems,
        widgetTitle: 'Direct Messages',
      }
    ];

    const style = { height: windowHeight };

    return (
      <aside className="LeftSidebar">
        <div className="LeftSidebar__body">
          <ScrollBar style={style}>
            <LeftSidebarWidgets menuGroups={sidebarMenuItems} />
          </ScrollBar>
        </div>
        {isModalOpen && isMobileSize && (
          <Modal
            isOpen
            modalFor="left-sidebar"
            modalPos="left"
            close={closeModal}
            unStyled
          >
            <ScrollBar style={style}>
              <LeftSidebarWidgets menuGroups={sidebarMenuItems} />
            </ScrollBar>
          </Modal>
        )}
      </aside>
    );
  }
}

export default LeftSidebar;

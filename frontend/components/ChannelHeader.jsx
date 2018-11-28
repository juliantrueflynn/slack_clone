import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from './Menu';
import ChannelHeaderSearch from './ChannelHeaderSearch';
import StatusIcon from './StatusIcon';
import './ChannelHeader.css';

const ChannelHeader = ({
  messages,
  channels,
  users,
  accordionOpen,
  drawerType,
  drawerClose,
  modalOpen,
  searchQuery,
  destroySearch,
  destroyChannelSubRequest,
  chatPath,
  history,
  match: { url, isExact },
}) => {
  const channel = channels[chatPath];
  const { dmUserSlug } = channel || {};

  const isDetailsOpen = drawerType === 'details';

  const linkToggle = (pathName) => {
    if (drawerType !== pathName) {
      history.push(`${url}/${pathName}`);
      return;
    }

    if (!isExact && drawerType === pathName) {
      drawerClose();
      history.push(url);
    }
  };

  let title;
  if (chatPath === 'unreads') {
    title = 'All Unreads';
  } else if (chatPath === 'threads') {
    title = 'All Threads';
  } else if (channel) {
    title = channel.hasDm ? channel.title : `#${channel.title}`;
  }

  const userMenuItems = [
    {
      key: 'favorites',
      icon: <FontAwesomeIcon icon={['fas', 'star']} size="lg" />,
      onClick: () => linkToggle('favorites'),
      isItemActive: drawerType === 'favorites',
    },
    {
      key: 'profile',
      icon: <FontAwesomeIcon icon="user-cog" size="lg" />,
      onClick: () => modalOpen('MODAL_PROFILE'),
    },
  ];

  let metaMenuItems = [];

  if (chatPath === 'unreads') {
    const unreadsLen = Object.values(channels).reduce((acc, curr) => {
      let total = acc;
      total += curr.unreadsLength;
      return total;
    }, 0);
    const label = unreadsLen ? `${unreadsLen} unreads` : 'No new messages';

    metaMenuItems = [{ key: 'unreads', label }];
  } else if (chatPath === 'threads') {
    const unreadsLen = messages.filter(convo => convo.hasUnreads).length;
    const label = unreadsLen ? `${unreadsLen} updated convos` : 'No new replies';

    metaMenuItems = [{ key: 'unreads', label }];
  } else if (channel && channel.hasDm) {
    const user = users[dmUserSlug];
    const userStatus = user && user.status;
    const email = user && user.email;

    metaMenuItems = [
      { key: 'status', icon: <StatusIcon member={user} />, label: userStatus },
      { key: 'email', label: email },
    ];
  } else if (channel && !channel.hasDm) {
    metaMenuItems = [
      {
        key: 'details',
        icon: <FontAwesomeIcon icon="user" size="sm" />,
        link: `${url}/details`,
        onClick: () => accordionOpen('members'),
        label: channel.members.length,
      },
      {
        key: 'pinned',
        icon: <FontAwesomeIcon icon="thumbtack" size="sm" />,
        link: `${url}/details`,
        onClick: () => accordionOpen('pinned'),
        label: channel.pins && channel.pins.length,
        condition: channel.pins && channel.pins.length,
      },
      {
        key: 'topic',
        onClick: () => modalOpen('MODAL_EDIT_CHANNEL'),
        icon: !!channel.topic || <FontAwesomeIcon icon="edit" size="sm" />,
        label: channel.topic || 'Add topic',
      }
    ];
  }

  const channelMenuItems = [
    {
      key: 'details',
      icon: <FontAwesomeIcon icon="info-circle" size="lg" fixedWidth />,
      onClick: () => linkToggle('details'),
      isItemActive: isDetailsOpen,
    },
    {
      key: 'edit-dropdown',
      icon: <FontAwesomeIcon icon="cog" size="lg" fixedWidth />,
      menuFor: 'channel-edit',
      items: [
        {
          label: 'View channel details',
          link: `${url}/details`,
          hasNoDrawer: true,
        },
        {
          label: `View ${title}’s profile`,
          link: `${url}/team/${dmUserSlug}`,
          hasNoDrawer: true,
          condition: channel && channel.hasDm,
        },
        {
          label: 'Edit channel',
          onClick: () => modalOpen('MODAL_EDIT_CHANNEL'),
          condition: channel && !channel.hasDm,
        },
        {
          label: `Leave ${title}`,
          onClick: () => destroyChannelSubRequest(channel.slug),
          condition: channel && !channel.hasDm,
        }
      ],
    }
  ];

  return (
    <header className="ChannelHeader">
      <div className="ChannelHeader__info">
        <h1 className="ChannelHeader__title">{title}</h1>
        <Menu menuFor="header-meta" items={metaMenuItems} isRow unStyled />
      </div>
      <nav className="ChannelHeader__navigate">
        {channel && <Menu items={channelMenuItems} menuFor="edit" isRow unStyled />}
        <ChannelHeaderSearch
          query={searchQuery}
          destroySearch={destroySearch}
          modalOpen={modalOpen}
        />
        <Menu menuFor="header-user" isRow items={userMenuItems} />
      </nav>
    </header>
  );
};

export default ChannelHeader;

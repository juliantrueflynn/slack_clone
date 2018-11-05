import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from './Menu';
import ChannelHeaderSearch from './ChannelHeaderSearch';
import SearchModal from './SearchModal';
import StatusIcon from './StatusIcon';
import Dropdown from './Dropdown';
import Button from './Button';
import './ChannelHeader.css';

const ChannelHeader = ({
  messages,
  channels,
  users,
  accordionOpen,
  drawerType,
  drawerClose,
  modalOpen,
  fetchSearchRequest,
  searchQuery,
  destroySearch,
  isSearchLoading,
  destroyChannelSubRequest,
  chatPath,
  history,
  match: { url, isExact },
}) => {
  const channel = channels[chatPath];
  const searchMessages = messages.filter(msg => msg.isInSearch).sort((a, b) => b.id - a.id);
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

  const ddItems = [
    {
      label: 'View channel details',
      link: `${url}/details`,
      hasNoDrawer: true,
    }
  ];

  let editMenuItems = [];
  let metaItems = [];

  if (chatPath === 'unreads') {
    const unreadsLen = Object.values(channels).reduce((acc, curr) => {
      let total = acc;
      total += curr.unreadsLength;
      return total;
    }, 0);
    const label = unreadsLen ? `${unreadsLen} unreads` : 'No new messages';

    metaItems = [{ key: 'unreads', label }];
  } else if (chatPath === 'threads') {
    const unreadsLen = messages.filter(convo => convo.hasUnreads).length;
    const label = unreadsLen ? `${unreadsLen} updated convos` : 'No new replies';

    metaItems = [{ key: 'unreads', label }];
  } else if (channel && channel.hasDm) {
    const user = users[channel.dmUserSlug];
    const userStatus = user && user.status;
    const email = user && user.email;

    metaItems = [
      { key: 'status', icon: <StatusIcon member={user} />, label: userStatus },
      { key: 'email', label: email },
    ];

    editMenuItems = ddItems.concat([
      {
        label: `View ${title}’s profile`,
        link: `${url}/team/${channel.dmUserSlug}`,
        hasNoDrawer: true,
      }
    ]);
  } else if (channel && !channel.hasDm) {
    metaItems = [
      {
        key: 'details',
        icon: <FontAwesomeIcon icon={['far', 'user']} size="sm" />,
        link: `${url}/details`,
        onClick: () => accordionOpen(),
        label: channel.members.length,
      },
      {
        key: 'topic',
        onClick: () => modalOpen('MODAL_EDIT_CHANNEL'),
        icon: !!channel.topic || <FontAwesomeIcon icon={['far', 'edit']} size="sm" />,
        label: channel.topic || 'Add topic',
      }
    ];

    editMenuItems = ddItems.concat([
      { label: 'Edit channel', onClick: () => modalOpen('MODAL_EDIT_CHANNEL') },
      { label: `Leave ${title}`, onClick: () => destroyChannelSubRequest(channel.subId) },
    ]);
  }

  return (
    <header className="ChannelHeader">
      <div className="ChannelHeader__info">
        <h1 className="ChannelHeader__title">{title}</h1>
        <Menu menuFor="header-meta" items={metaItems} isRow unStyled />
      </div>
      <nav className="ChannelHeader__navigate">
        {channel && (
          <Button
            buttonFor="channel-details"
            onClick={() => linkToggle('details')}
            isActive={isDetailsOpen}
            unStyled
          >
            <FontAwesomeIcon icon="info-circle" size="lg" />
          </Button>
        )}
        {channel && (
          <Dropdown menuFor="channel-edit" items={editMenuItems} unStyled>
            <FontAwesomeIcon icon="cog" size="lg" />
          </Dropdown>
        )}
        <ChannelHeaderSearch
          query={searchQuery}
          destroySearch={destroySearch}
          modalOpen={modalOpen}
        />
        <Menu menuFor="header-user" isRow items={userMenuItems} />
      </nav>
      <SearchModal
        searchQuery={searchQuery}
        messages={searchMessages}
        users={users}
        fetchSearchRequest={fetchSearchRequest}
        destroySearch={destroySearch}
        isSearchLoading={isSearchLoading}
      />
    </header>
  );
};

export default ChannelHeader;

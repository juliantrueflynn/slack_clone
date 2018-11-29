import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from './Menu';
import StatusIcon from './StatusIcon';
import './ChannelHeader.css';
import SearchBar from './SearchBar';

class ChannelHeader extends React.Component {
  getPageTitle() {
    const { channelsMap, chatPath } = this.props;
    const channel = channelsMap[chatPath];

    let title;
    if (chatPath === 'unreads') {
      title = 'All Unreads';
    } else if (chatPath === 'threads') {
      title = 'All Threads';
    } else if (channel) {
      title = channel.hasDm ? channel.title : `#${channel.title}`;
    }

    return title;
  }

  handleLinkToggle(pathName) {
    const {
      history,
      drawerType,
      drawerClose,
      match: { url, isExact },
    } = this.props;

    if (drawerType !== pathName) {
      history.push(`${url}/${pathName}`);
      return;
    }

    if (!isExact && drawerType === pathName) {
      drawerClose();
      history.push(url);
    }
  }

  render() {
    const {
      messages,
      channelsMap,
      users,
      accordionOpen,
      drawerType,
      modalOpen,
      searchQuery,
      destroySearch,
      destroyChannelSubRequest,
      chatPath,
      match: { url },
    } = this.props;

    const title = this.getPageTitle();
    const channel = channelsMap[chatPath];
    const { dmUserSlug } = channel || {};

    const isDetailsOpen = drawerType === 'details';

    let metaMenuItems = [];

    if (chatPath === 'unreads') {
      const channels = Object.values(channelsMap);
      const unreadsLen = channels.reduce((acc, curr) => {
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
          label: channel.members.length,
          onClick: () => accordionOpen('members'),
        },
        {
          key: 'pinned',
          icon: <FontAwesomeIcon icon="thumbtack" size="sm" />,
          link: `${url}/details`,
          label: channel.pins && channel.pins.length,
          onClick: () => accordionOpen('pinned'),
          condition: channel.pins && channel.pins.length,
        },
        {
          key: 'topic',
          icon: !!channel.topic || <FontAwesomeIcon icon="edit" size="sm" />,
          label: channel.topic || 'Add topic',
          onClick: () => modalOpen('MODAL_EDIT_CHANNEL'),
        }
      ];
    }

    const userMenuItems = [
      {
        key: 'favorites',
        icon: <FontAwesomeIcon icon={['fas', 'star']} size="lg" />,
        onClick: () => this.handleLinkToggle('favorites'),
        isItemActive: drawerType === 'favorites',
      },
      {
        key: 'profile',
        icon: <FontAwesomeIcon icon="user-cog" size="lg" />,
        onClick: () => modalOpen('MODAL_PROFILE'),
      },
    ];

    const channelMenuItems = [
      {
        key: 'details',
        icon: <FontAwesomeIcon icon="info-circle" size="lg" fixedWidth />,
        onClick: () => this.handleLinkToggle('details'),
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
          <SearchBar
            query={searchQuery}
            destroySearch={destroySearch}
            modalOpen={modalOpen}
            hasClearIcon
          />
          <Menu menuFor="header-user" isRow items={userMenuItems} />
        </nav>
      </header>
    );
  }
}

export default ChannelHeader;

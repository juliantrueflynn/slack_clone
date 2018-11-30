import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from './Menu';
import StatusIcon from './StatusIcon';
import Button from './Button';
import ChannelHeaderNavbar from './ChannelHeaderNavbar';
import './ChannelHeader.css';

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

  render() {
    const {
      messages,
      channelsMap,
      users,
      accordionOpen,
      modalOpen,
      chatPath,
      match,
      location,
      ...props
    } = this.props;

    const title = this.getPageTitle();
    const channel = channelsMap[chatPath];
    const { url } = match;
    const { dmUserSlug } = channel || {};

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

    return (
      <header className="ChannelHeader">
        <Button buttonFor="left-sidebar-mobile" unStyled onClick={() => modalOpen('MODAL_LEFT_SIDEBAR')}>
          <FontAwesomeIcon icon="bars" size="lg" />
        </Button>
        <div className="ChannelHeader__info">
          <h1 className="ChannelHeader__title">{title}</h1>
          <Menu menuFor="header-meta" items={metaMenuItems} isRow unStyled />
        </div>
        <ChannelHeaderNavbar
          chatTitle={title}
          modalOpen={modalOpen}
          channel={channel}
          match={match}
          messages={messages}
          users={users}
          channelsMap={channelsMap}
          {...props}
        />
      </header>
    );
  }
}

export default ChannelHeader;

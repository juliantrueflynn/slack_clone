import React, { Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StatusIcon from './StatusIcon';
import Button from './Button';
import './ChannelHeaderMeta.css';

const ChannelHeaderMeta = ({
  chatPath,
  channel,
  messages,
  channelsMap,
  users,
  modalOpen,
  accordionOpen,
  match: { url },
}) => {
  let metaItems = [];
  let groupType = chatPath;

  if (chatPath === 'unreads') {
    const unreadsLen = Object.values(channelsMap).reduce((acc, curr) => {
      let total = acc;
      total += curr.unreadsLength;
      return total;
    }, 0);

    let content;
    if (unreadsLen) {
      content = `${unreadsLen} new messages`;
    } else {
      content = 'No new messages';
    }

    metaItems = [
      { name: 'unreads', content },
    ];
  }

  if (chatPath === 'threads') {
    const unreadConvosLen = messages.filter(convo => convo.hasUnreads).length;

    let content;
    if (unreadConvosLen) {
      content = `${unreadConvosLen} updated convos`;
    } else {
      content = 'No new replies';
    }

    metaItems = [
      { name: 'unreads', content },
    ];
  }

  if (channel && channel.hasDm) {
    groupType = 'dm';
    const user = users[channel.dmUserSlug];
    const userStatus = user && user.status;
    const email = user && user.email;

    metaItems = [
      {
        name: 'status',
        content: (
          <Fragment>
            <StatusIcon member={user} />
            {userStatus}
          </Fragment>
        )
      },
      { name: 'email', content: email },
    ];
  }

  if (channel && !channel.hasDm) {
    groupType = 'channel';
    const subsLen = channel && channel.members.length;
    const hasTopic = !!(channel && channel.topic);

    metaItems = [
      {
        name: 'details',
        content: (
          <Link to={`${url}/details`} onClick={() => accordionOpen()}>
            <FontAwesomeIcon icon={['far', 'user']} size="sm" />
            {subsLen}
          </Link>
        )
      },
      {
        name: 'topic',
        content: (
          <Button onClick={modalOpen} buttonFor="edit-topic" unStyled>
            {channel.topic}
            {hasTopic || <FontAwesomeIcon icon={['far', 'edit']} size="sm" />}
            {hasTopic || 'Add topic'}
          </Button>
        )
      }
    ];
  }

  return (
    <div className={`ChannelHeaderMeta ${groupType}`}>
      {metaItems.map(item => (
        <div key={item.name} className={`ChannelHeaderMeta__item ${item.name}`}>
          {item.content}
        </div>
      ))}
    </div>
  );
};

export default withRouter(ChannelHeaderMeta);

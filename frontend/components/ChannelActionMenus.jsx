import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './Button';
import Dropdown from './Dropdown';

const ChannelActionMenus = ({
  channel,
  chatTitle,
  drawerType,
  modalOpen,
  url,
  destroyChannelSub,
  linkToggle,
}) => {
  const isDetailsOpen = drawerType === 'details';
  const leaveChannel = () => destroyChannelSub(channel.subId);

  let editMenuItems = [];
  const ddItems = [
    {
      label: 'View channel details',
      link: `${url}/details`,
      hasNoDrawer: true,
    }
  ];
  if (channel && !channel.hasDm) {
    editMenuItems = ddItems.concat([
      { label: 'Edit channel', onClick: modalOpen },
      { label: `Leave ${chatTitle}`, onClick: leaveChannel },
    ]);
  }

  if (channel && channel.hasDm) {
    editMenuItems = ddItems.concat([
      {
        label: `View ${chatTitle}’s profile`,
        link: `${url}/team/${channel.dmUserSlug}`,
        hasNoDrawer: true,
      }
    ]);
  }

  return (
    <Fragment>
      <Button
        buttonFor="channel-details"
        onClick={() => linkToggle('details')}
        isActive={isDetailsOpen}
        unStyled
      >
        <FontAwesomeIcon icon="info-circle" size="lg" />
      </Button>

      <Dropdown menuFor="channel-edit" items={editMenuItems} unStyled>
        <FontAwesomeIcon icon="cog" size="lg" />
      </Dropdown>
    </Fragment>
  );
};

export default ChannelActionMenus;

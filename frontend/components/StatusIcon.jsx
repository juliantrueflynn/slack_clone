import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './StatusIcon.css';

const StatusIcon = ({ member, size, ...props }) => {
  if (!member || !member.status) {
    return null;
  }

  let circleType = 'fas';
  if (!member.status || member.status === 'offline') {
    circleType = 'far';
  }

  const icon = [circleType, 'circle'];
  const iconSize = size || 'xs';
  const classNames = `StatusIcon StatusIcon__${member.status}`;

  return (
    <FontAwesomeIcon className={classNames} icon={icon} size={iconSize} {...props} />
  );
};

export default StatusIcon;

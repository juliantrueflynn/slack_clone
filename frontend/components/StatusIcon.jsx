import React from 'react';
import { faCircle as fasCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle as farCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './StatusIcon.css';

const StatusIcon = ({ member, size, ...props }) => {
  if (!member || !member.status) {
    return null;
  }

  const iconSvg = member.status === 'online' ? fasCircle : farCircle;
  const iconSize = size || 'xs';
  const classNames = `StatusIcon StatusIcon__${member.status}`;

  return (
    <FontAwesomeIcon className={classNames} icon={iconSvg} size={iconSize} {...props} />
  );
};

export default StatusIcon;

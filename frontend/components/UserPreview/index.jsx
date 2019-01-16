import React from 'react';
import Avatar from '../Avatar';
import StatusIcon from '../StatusIcon';
import './styles.css';

const UserPreview = ({
  user,
  avatarVersion,
  avatarSize,
  hasNoStatus
}) => (
  <div className="UserPreview">
    <Avatar user={user} size={avatarSize} avatarVersion={avatarVersion} />
    <div className="UserPreview__content">
      <div className="UserPreview__username">
        <span className="UserPreview__username-txt">
          {user.username}
        </span>
        {hasNoStatus || <StatusIcon member={user} />}
      </div>
      <div className="UserPreview__email">
        {user.email}
      </div>
    </div>
  </div>
);

export default UserPreview;

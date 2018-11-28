import React, { Fragment } from 'react';
import classNames from 'classnames';
import Avatar from './Avatar';
import StatusIcon from './StatusIcon';
import './UserPreview.css';

const UserPreview = ({
  user,
  avatarVersion,
  avatarSize,
  hasNoStatus,
  children,
  alignCenter,
  ...props
}) => {
  const previewClassNames = classNames('UserPreview', {
    'UserPreview__align-center': alignCenter,
  });

  return (
    <div className={previewClassNames} {...props}>
      <Avatar user={user} size={avatarSize} avatarVersion={avatarVersion} />
      <div className="UserPreview__content">
        {children || (
          <Fragment>
            <div className="UserPreview__username">
              <span className="UserPreview__username-txt">{user.username}</span>
              {hasNoStatus || <StatusIcon member={user} />}
            </div>
            <div className="UserPreview__email">{user.email}</div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default UserPreview;

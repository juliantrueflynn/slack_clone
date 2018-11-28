import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const Avatar = ({
  user,
  baseUrl,
  avatarFor,
  size,
  avatarVersion,
  ...attrs
}) => {
  if (!user) {
    return null;
  }

  const {
    avatarThumb,
    status,
    username,
    authorSlug,
    slug,
  } = user;

  const userSlug = slug || authorSlug;
  const avatarLink = `${baseUrl}/team/${userSlug}`;
  const imgSize = size || 36;

  let imgVersion = avatarThumb;
  if (avatarVersion) {
    imgVersion = user[avatarVersion];
  }

  const imgStyle = {
    display: 'block',
    borderRadius: '3px',
  };

  const avatarClassNames = classNames('Avatar', {
    [`Avatar__${avatarFor}`]: avatarFor,
    [`Avatar__${avatarFor}--${status}`]: avatarFor && status,
  });

  const userImage = (
    <img
      src={imgVersion}
      className="Avatar__image"
      height={imgSize}
      width={imgSize}
      title={username}
      alt={`${username} avatar`}
      aria-label={username}
      style={imgStyle}
      {...attrs}
    />
  );

  if (!baseUrl) {
    return (
      <div className={avatarClassNames}>
        {userImage}
      </div>
    );
  }

  return (
    <Link to={avatarLink} className={avatarClassNames}>
      {userImage}
    </Link>
  );
};

export default Avatar;

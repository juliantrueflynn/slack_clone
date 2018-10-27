import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import './Avatar.css';

const Avatar = ({
  author,
  baseUrl,
  avatarFor,
  size,
  avatarVersion,
  ...attrs
}) => {
  if (!author) {
    return null;
  }

  const {
    avatarThumb,
    status,
    username,
    slug,
  } = author;

  let imgVersion = avatarThumb;
  if (avatarVersion) {
    imgVersion = author[avatarVersion];
  }

  const avatarLink = `${baseUrl}/team/${slug}`;
  const imgSize = size || 36;
  const avatarClassNames = classNames('Avatar', {
    [`Avatar__${avatarFor}`]: avatarFor,
    [`Avatar__${avatarFor}--${status}`]: avatarFor && status,
  });

  const authorImage = (
    <img
      src={imgVersion}
      className="Avatar__image"
      height={imgSize}
      width={imgSize}
      title={username}
      alt={`${username} avatar`}
      aria-label={username}
      {...attrs}
    />
  );

  if (!baseUrl) {
    return (
      <div className={avatarClassNames}>
        {authorImage}
      </div>
    );
  }

  return (
    <Link to={avatarLink} className={avatarClassNames}>
      {authorImage}
    </Link>
  );
};

export default Avatar;

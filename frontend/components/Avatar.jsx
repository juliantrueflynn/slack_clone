import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import './Avatar.css';

const Avatar = ({
  author,
  baseUrl,
  avatarFor,
  size,
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

  const imgSize = size || 36;
  let imgSrc = `https://via.placeholder.com/${imgSize}x${imgSize}`;
  if (avatarThumb) {
    imgSrc = avatarThumb;
  }

  const avatarClassNames = classNames('Avatar', {
    [`Avatar__${avatarFor}`]: avatarFor,
    [`Avatar__${avatarFor}--${status}`]: avatarFor && status,
  });

  const avatarLink = `${baseUrl}/team/${slug}`;

  const authorImage = (
    <img
      src={imgSrc}
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

import React from 'react';
import { Link } from 'react-router-dom';
import './Avatar.css';

const Avatar = ({
  author,
  baseUrl,
  avatarFor,
  size,
  ...attrs
}) => {
  if (!author) return null;

  const imgSize = size || 40;
  let classNames = 'Avatar';
  if (avatarFor) classNames += ` Avatar--${baseUrl ? 'link' : 'div'}`;

  const authorImage = (
    <img
      src={`https://via.placeholder.com/${imgSize}x${imgSize}`}
      className="Avatar__image"
      height={imgSize}
      width={imgSize}
      title={author.username}
      alt={`${author.username} avatar`}
      aria-label={author.username}
      {...attrs}
    />
  );

  if (!baseUrl) {
    return (
      <div className={classNames}>
        {authorImage}
      </div>
    );
  }

  return (
    <Link to={`${baseUrl}/team/${author.slug}`} className={classNames}>
      {authorImage}
    </Link>
  );
};

export default Avatar;

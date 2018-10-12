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
  if (!author) {
    return null;
  }

  const imgSize = size || 36;
  let imgSrc = `https://via.placeholder.com/${imgSize}x${imgSize}`;
  if (author.avatarThumb) {
    imgSrc = author.avatarThumb;
  }


  let classNames = 'Avatar';
  if (avatarFor) classNames += ` Avatar__${avatarFor}`;
  classNames += ` Avatar--${baseUrl ? 'link' : 'div'}`;

  const authorImage = (
    <img
      src={imgSrc}
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

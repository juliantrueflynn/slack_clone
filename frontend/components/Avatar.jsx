import React from 'react';
import { Link } from 'react-router-dom';
import './Avatar.css';

const Avatar = ({ author, baseUrl, avatarFor }) => {
  if (!author) {
    return null;
  }

  let classNames = 'Avatar';
  if (avatarFor) classNames += ` Avatar--${baseUrl ? 'link' : 'div'}`;

  const authorImage = (
    <img
      src="https://via.placeholder.com/40x40"
      className="Avatar__image"
      title={author.username}
      alt={`${author.username} avatar`}
      aria-label={author.username}
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

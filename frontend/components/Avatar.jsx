import React from 'react';
import { Link } from 'react-router-dom';

const Avatar = ({ author, baseUrl }) => {
  if (!author) {
    return null;
  }

  return (
    <Link to={`${baseUrl}/team/${author.slug}`} className="msg__avatar-link">
      <img src="https://via.placeholder.com/40x40" alt={`${author.id}'s avatar`} />
    </Link>
  );
};

export default Avatar;

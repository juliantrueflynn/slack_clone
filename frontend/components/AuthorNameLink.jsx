import React from 'react';
import { Link } from 'react-router-dom';

const AuthorNameLink = ({ author, baseUrl }) => {
  if (!author) {
    return null;
  }

  return (
    <Link to={`${baseUrl}/team/${author.slug}`} className="msg__author">
      {author.username}
    </Link>
  );
};

export default AuthorNameLink;

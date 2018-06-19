import React from 'react';
import { Link } from 'react-router-dom';

const SingleMessageThread = (props) => {
  const { thread, match: { params }, messageSlug } = props;
  const baseUrl = `/${params.workspaceSlug}/${params.channelSlug}`;

  if (props.isChild) {
    return null;
  }

  if (thread && thread.length < 1) {
    return null;
  }

  return (
    <div>
      <Link to={`${baseUrl}/thread/${messageSlug}`} className="btn btn-unstyled">
        {thread.length}
      </Link>
    </div>
  );
};

export default SingleMessageThread;

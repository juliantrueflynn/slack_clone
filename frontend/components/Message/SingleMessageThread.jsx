import React from 'react';
import { Link } from 'react-router-dom';
import './SingleMessageThread.css';

const SingleMessageThread = (props) => {
  const { isSingleMessage, message, match: { params: { channelSlug, workspaceSlug } } } = props;
  const { thread, slug, parentMessageId } = message;
  const threadUrl = `/${workspaceSlug}/${channelSlug}/thread/${slug}`;

  if (parentMessageId || isSingleMessage) {
    return null;
  }

  if (thread && thread.length === 0) {
    return null;
  }

  return (
    <div className="thread-meta">
      <Link to={threadUrl} className="thread-meta__link">
        <ul className="thread-meta__items">
          <li className="thread-meta__item thread-meta__avatar">authorId: #{message.authorId}</li>
          <li className="thread-meta__item thread-meta__counter">{thread && thread.length} reply</li>
          <li className="thread-meta__item thread-meta__date">{props.threadLastUpdate}</li>
        </ul>
      </Link>
    </div>
  );
};

export default SingleMessageThread;

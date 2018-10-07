import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import MessageContainer from './MessageContainer';
import ChannelSub from './ChannelSub';
import Avatar from './Avatar';
import MessageHoverMenu from './MessageHoverMenu';
import './ChannelEntry.css';

class ChannelEntry extends React.Component {
  render() {
    const { url, users, entry } = this.props;
    const author = { slug: entry.authorSlug, username: entry.authorName };
    const authorUrl = `${url}/team/${entry.authorSlug}`;

    let classNames = 'ChannelEntry';
    classNames += ` ChannelEntry__${entry.entityType}`;

    return (
      <div className={classNames} role="listitem">
        <MessageHoverMenu
          message={entry}
          isEditing={isEditing}
          handleEditToggle={this.handleEditToggle}
          createFavoriteRequest={createFavoriteRequest}
          deleteMessageRequest={deleteMessageRequest}
          deleteFavoriteRequest={deleteFavoriteRequest}
          deleteReactionRequest={deleteReactionRequest}
          currentUser={currentUser}
          modalOpen={modalOpen}
        />
        <Avatar baseUrl={url} author={author} />
        <div className="ChannelEntry__body">
          <div className="ChannelEntry__meta">
            <Link to={authorUrl} className="ChannelEntry__author">
              {entry.authorName}
            </Link>
            <time className="ChannelEntry__time">
              {entry.createdAt}
            </time>
          </div>
          {entry.entityType === 'entry' && (
            <MessageContainer url={url} users={users} message={entry} />
          )}
          {entry.entityType !== 'entry' && (
            <ChannelSub sub={entry} />
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(ChannelEntry);

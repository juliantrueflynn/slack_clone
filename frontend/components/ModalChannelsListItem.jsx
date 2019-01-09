import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ModalChannelsListItem.css';

class ModalChannelsListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleLinkClose = this.handleLinkClose.bind(this);
  }

  handleLinkClose() {
    const { close } = this.props;
    close();
  }

  render() {
    const { channel, workspaceSlug } = this.props;
    const {
      slug,
      createdAt,
      ownerName,
      title,
    } = channel;

    const channelUrl = `/${workspaceSlug}/messages/${slug}`;

    return (
      <Link role="listitem" className="ModalChannelsListItem" to={channelUrl} onClick={this.handleLinkClose}>
        <h3 className="ModalChannelsListItem__title">
          <FontAwesomeIcon icon="hashtag" className="ModalChannelsListItem__hashtag" size="xs" />
          {title}
        </h3>
        <div className="ModalChannelsListItem__body">
          <div className="ModalChannelsListItem__byline">
            {'Created by '}
            <strong>{ownerName}</strong>
            {` on ${createdAt}`}
          </div>
        </div>
      </Link>
    );
  }
}

export default ModalChannelsListItem;

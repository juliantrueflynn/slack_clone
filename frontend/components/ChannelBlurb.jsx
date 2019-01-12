import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { dateUtil } from '../util/dateUtil';
import Button from './Button';
import './ChannelBlurb.css';

class ChannelBlurb extends React.Component {
  constructor(props) {
    super(props);
    this.openEditor = this.openEditor.bind(this);
  }

  userPathUrl(userSlug) {
    const { matchUrl } = this.props;
    return `${matchUrl}/team/${userSlug}`;
  }

  openEditor() {
    const { openModal, chatroom, currentUserSlug } = this.props;

    openModal('MODAL_FORM_CHATROOM', { chatroom, currentUserSlug });
  }

  render() {
    const { chatroom, currentUserSlug, blurbRef } = this.props;
    const {
      hasDm,
      dmUserSlug,
      ownerSlug,
      ownerName,
      createdAt,
      topic,
      title,
    } = chatroom;
    let description = (
      <div className="ChannelBlurb__description">
        {'This is the beginning of your direct message conversation with '}
        <Link className="ChannelBlurb__label" to={this.userPathUrl(dmUserSlug)}>{title}</Link>
      </div>
    );

    if (!hasDm) {
      let creator = (
        <Link className="ChannelBlurb__label" to={this.userPathUrl(ownerSlug)}>{ownerName}</Link>
      );

      if (currentUserSlug === ownerSlug) {
        creator = 'You';
      }

      const date = dateUtil(createdAt);
      const dateCreated = date.isToday() ? 'today' : `on ${date.monthName()} ${date.dayOrdinal()}`;

      description = (
        <div className="ChannelBlurb__description">
          {creator}
          {` created this channel ${dateCreated}. This is the beginning of the `}
          <span className="ChannelBlurb__ch-name">{title}</span>
          {' channel. '}
          {topic && `Purpose: ${topic} `}
          {topic && (
            <span className="ChannelBlurb__parentheses">
              <Button buttonFor="edit" onClick={this.openEditor} unStyled>edit</Button>
            </span>
          )}
        </div>
      );
    }

    return (
      <section className="ChannelBlurb" ref={blurbRef}>
        <h2 className="ChannelBlurb__title">{title}</h2>
        {description}
        {!topic && !hasDm && (
          <div className="ChannelBlurb__editor">
            <Button buttonFor="edit-label" onClick={this.openEditor} unStyled>
              <FontAwesomeIcon icon="pencil-alt" size="xs" />
              Set a topic
            </Button>
          </div>
        )}
      </section>
    );
  }
}

export default ChannelBlurb;

import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { dateUtil } from '../util/dateUtil';
import Button from './Button';
import './ChannelBlurb.css';

const ChannelBlurb = ({
  channel,
  currentUserSlug,
  openModal,
  matchUrl,
}) => {
  const {
    hasDm,
    dmUserSlug,
    ownerSlug,
    ownerName,
    createdAt,
    topic,
    title,
  } = channel;
  const openEditor = () => openModal('MODAL_FORM_CHANNEL');
  const userPathUrl = userSlug => `${matchUrl}/team/${userSlug}`;
  let chatTitle = title;
  let description;

  if (hasDm) {
    description = (
      <div className="ChannelBlurb__description">
        {'This is the beginning of your direct message conversation with '}
        <Link className="ChannelBlurb__label" to={userPathUrl(dmUserSlug)}>{title}</Link>
      </div>
    );
  } else {
    let creator = (
      <Link className="ChannelBlurb__label" to={userPathUrl(ownerSlug)}>{ownerName}</Link>
    );

    if (currentUserSlug === ownerSlug) {
      creator = 'You';
    }

    const date = dateUtil(createdAt);
    const dateCreated = date.isToday() ? 'today' : `on ${date.monthName()} ${date.dayOrdinal()}`;

    chatTitle = <span className="ChannelBlurb__title-text">{title}</span>;

    description = (
      <div className="ChannelBlurb__description">
        {creator}
        {` created this channel ${dateCreated}. This is the beginning of the `}
        {chatTitle}
        {' channel. '}
        {topic && `Purpose: ${topic} `}
        {topic && (
          <span className="ChannelBlurb__parentheses">
            <Button buttonFor="edit" onClick={openEditor} unStyled>
              edit
            </Button>
          </span>
        )}
      </div>
    );
  }

  const blurbClassNames = classNames('ChannelBlurb', {
    ChannelBlurb__dm: hasDm,
    ChannelBlurb__channel: !hasDm,
  });

  return (
    <section className={blurbClassNames}>
      <h2 className="ChannelBlurb__title">{chatTitle}</h2>
      {description}
      {!topic && !hasDm && (
        <div className="ChannelBlurb__editor">
          <Button buttonFor="edit-label" onClick={openEditor} unStyled>
            <FontAwesomeIcon icon="pencil-alt" size="xs" />
            Set a topic
          </Button>
        </div>
      )}
    </section>
  );
};

export default ChannelBlurb;

import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { dateUtil } from '../util/dateUtil';
import './ChannelBlurb.css';

const ChannelBlurb = ({ channel, currentUserSlug, match: { url } }) => {
  const {
    hasDm,
    dmUserSlug,
    ownerSlug,
    ownerName,
    createdAt,
    title,
  } = channel;
  let chatTitle = title;
  let description;

  if (hasDm) {
    const userLink = `${url}/team/${dmUserSlug}`;
    description = (
      <Fragment>
        {'This is the beginning of your direct message conversation with '}
        <Link className="ChannelBlurb__label" to={userLink}>
          <span className="ChannelBlurb__label-at">
            @
          </span>
          {title}
        </Link>
      </Fragment>
    );
  } else {
    const ownerLink = `${url}/team/${ownerSlug}`;
    let channelCreator = (
      <Link className="ChannelBlurb__label" to={ownerLink}>
        <span className="ChannelBlurb__label-at">
          @
        </span>
        {ownerName}
      </Link>
    );

    if (currentUserSlug === ownerSlug) {
      channelCreator = 'You';
    }

    const date = dateUtil(createdAt);
    let dateCreated = `on ${date.monthName()} ${date.dayOrdinal()}`;
    if (date.isToday()) {
      dateCreated = 'today';
    }

    chatTitle = (
      <Fragment>
        #
        <span className="ChannelBlurb__title-text">
          {title}
        </span>
      </Fragment>
    );
    description = (
      <Fragment>
        {channelCreator}
        {` created this channel ${dateCreated}. This is the beginning of the `}
        {chatTitle}
        {' channel.'}
      </Fragment>
    );
  }

  let classNames = 'ChannelBlurb';
  classNames += hasDm ? ' ChannelBlurb__dm' : ' ChannelBlurb__channel';

  return (
    <section className={classNames}>
      <h2 className="ChannelBlurb__title">
        {chatTitle}
      </h2>
      <div className="ChannelBlurb__description">
        {description}
      </div>
    </section>
  );
};

export default withRouter(ChannelBlurb);

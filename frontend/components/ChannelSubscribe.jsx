import React from 'react';
import Button from './Button';
import { dateUtil } from '../util/dateUtil';
import './ChannelSubscribe.css';

class ChannelSubscribe extends React.Component {
  constructor(props) {
    super(props);
    this.clickSubscribe = this.clickSubscribe.bind(this);
  }

  clickSubscribe() {
    const { createChannelSubRequest, id: channelId } = this.props;
    createChannelSubRequest({ channelId });
  }

  render() {
    const {
      title,
      createdAt,
      ownerName,
      matchUrl,
    } = this.props;

    const chatTitle = ` #${title}`;
    const date = dateUtil(createdAt);
    let dateCreated;
    if (date.isToday()) {
      dateCreated = `on ${date.monthDayYear()}`;
    } else {
      dateCreated = 'today';
    }
    const detailsUrl = `${matchUrl}/details`;

    return (
      <div className="ChannelSubscribe">
        <h3 className="ChannelSubscribe__title">
          You are viewing
          <strong>
            {chatTitle}
          </strong>
        </h3>
        <div className="ChannelSubscribe__text">
          {`Created by ${ownerName} ${dateCreated}`}
        </div>
        <div className="Btn__group">
          <Button buttonFor="subscribe" color="green" onClick={this.clickSubscribe}>
            Join Channel
          </Button>
          <Button buttonFor="details" color="white" linkTo={detailsUrl}>
            View Details
          </Button>
        </div>
      </div>
    );
  }
}

export default ChannelSubscribe;

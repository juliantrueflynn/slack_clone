import React from 'react';
import Button from './Button';
import './ChannelSubscribe.css';
import { dateUtil } from '../util/dateUtil';

class ChannelSubscribe extends React.Component {
  constructor(props) {
    super(props);
    this.clickSubscribe = this.clickSubscribe.bind(this);
  }

  clickSubscribe() {
    const { createChannelSubRequest, channel: { id } } = this.props;
    const channelSub = { channelId: id };
    createChannelSubRequest(channelSub);
  }

  render() {
    const { channel } = this.props;

    if (channel.hasDm || channel.isSub) {
      return null;
    }

    const chatTitle = ` #${channel.title}`;
    const date = dateUtil(channel.createdAt);
    let dateCreated;
    if (date.isToday()) {
      dateCreated = `on ${date.monthDayYear()}`;
    } else {
      dateCreated = 'today';
    }

    return (
      <div className="ChannelSubscribe">
        <h3 className="ChannelSubscribe__title">
          You are viewing
          <strong>
            {chatTitle}
          </strong>
        </h3>
        <div className="ChannelSubscribe__text">
          {`Created by ${channel.ownerName} ${dateCreated}`}
        </div>
        <Button buttonFor="subscribe" color="green" onClick={this.clickSubscribe}>
          Join Channel
        </Button>
      </div>
    );
  }
}

export default ChannelSubscribe;

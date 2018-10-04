import React from 'react';
import Button from './Button';
import './ChannelSubscribe.css';

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

    return (
      <div className="ChannelSubscribe">
        <h3 className="ChannelSubscribe__title">
          {channel.title}
        </h3>
        <div className="ChannelSubscribe__text">
          {`Created by ${channel.ownerName} on ${channel.createdAt}`}
        </div>
        <Button buttonFor="subscribe" color="green" onClick={this.clickSubscribe}>
          Join Channel
        </Button>
      </div>
    );
  }
}

export default ChannelSubscribe;

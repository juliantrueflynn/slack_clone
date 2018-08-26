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

  description() {
    const { ownerName, channel } = this.props;
    return `Created by ${ownerName} on ${channel.createdAt}`;
  }

  render() {
    const {
      channel: { hasDm },
      title,
      isChatSub,
    } = this.props;

    if (hasDm || isChatSub) return null;

    return (
      <div className="ChannelSubscribe">
        <h3 className="ChannelSubscribe__title">
          {title}
        </h3>
        <div className="ChannelSubscribe__text">
          {this.description()}
        </div>
        <Button onClick={this.clickSubscribe}>
          Join Channel
        </Button>
      </div>
    );
  }
}

export default ChannelSubscribe;

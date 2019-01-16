import React from 'react';
import { withRouter } from 'react-router-dom';
import Button from '../Button';
import { dateUtil } from '../../util/dateUtil';
import './styles.css';

class ChannelSubscribe extends React.Component {
  constructor(props) {
    super(props);
    this.clickSubscribe = this.clickSubscribe.bind(this);
  }

  clickSubscribe() {
    const { createChatroomSubRequest, chatroomId } = this.props;
    createChatroomSubRequest(chatroomId);
  }

  render() {
    const {
      chatroomTitle,
      createdAt,
      ownerName,
      match: { url },
    } = this.props;

    const chatTitle = ` #${chatroomTitle}`;
    const date = dateUtil(createdAt);
    let dateCreated;
    if (date.isToday()) {
      dateCreated = `on ${date.monthDayYear()}`;
    } else {
      dateCreated = 'today';
    }

    const detailsUrl = `${url}/details`;

    return (
      <div className="ChannelSubscribe">
        <h3 className="ChannelSubscribe__title">
          You are viewing
          <strong>{chatTitle}</strong>
        </h3>
        <div className="ChannelSubscribe__text">
          {`Created by ${ownerName} ${dateCreated}`}
        </div>
        <div className="ChannelSubscribe__btn-group">
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

export default withRouter(ChannelSubscribe);

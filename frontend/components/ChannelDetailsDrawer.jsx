import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from './Avatar';
import StatusIcon from './StatusIcon';
import Button from './Button';
import { dateUtil } from '../util/dateUtil';

class ChannelDetailsDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailsActive: true,
      membersActive: false,
    };
  }

  handleAccordionClick(name) {
    const { ...state } = this.state;
    this.setState({ [name]: !state[name] });
  }

  render() {
    const { channel, members } = this.props;
    const { detailsActive, membersActive } = this.state;

    if (!channel) {
      return null;
    }

    const dateCreated = dateUtil(channel.createdAt).monthDayYear();
    const usersLen = channel.members.length;

    return (
      <div className="ChannelDetailsDrawer">
        <div className="ChannelDetailsDrawer__section">
          <h3 className="ChannelDetailsDrawer__section-title">
            <Button buttonFor="accordion" unStyled onClick={() => this.handleAccordionClick('detailsActive')}>
              <FontAwesomeIcon icon="info-circle" />
              Channel Details
            </Button>
          </h3>
          {detailsActive && (
            <div className="ChannelDetailsDrawer__section-body">
              <h4>Purpose</h4>
              {channel.topic || 'Set a channel topic'}
              <h4>Created</h4>
              {`${dateCreated} by ${channel.ownerName}`}
            </div>
          )}
        </div>
        <div className="ChannelDetailsDrawer__section">
          <h3 className="ChannelDetailsDrawer__section-title">
            <Button buttonFor="accordion" unStyled onClick={() => this.handleAccordionClick('membersActive')}>
              <FontAwesomeIcon icon="users" />
              {`${usersLen} Members`}
            </Button>
          </h3>
          {membersActive && (
            <div className="ChannelDetailsDrawer__section-body">
              {channel.members.map(userSlug => (
                <div key={userSlug} className="ChannelDetailsDrawer__member">
                  <StatusIcon member={members[userSlug]} />
                  <Avatar author={members[userSlug]} size="22" />
                  {members[userSlug].username}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ChannelDetailsDrawer;

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
      details: true,
      members: false,
    };
  }

  componentDidMount() {
    const { accordion } = this.props;

    if (!accordion) {
      return;
    }

    Object.keys(accordion).forEach((key) => {
      this.setState({ [key]: accordion[key] });
    });
  }

  componentDidUpdate(_, prevState) {
    const { accordion } = this.props;
    const { members } = this.state;

    if (prevState.members !== members) {
      return;
    }

    if (accordion.members !== members) {
      this.setMembersState(accordion.members);
    }
  }

  setMembersState(val) {
    const { members } = this.state;

    if (members !== val) {
      this.setState({ members: val });
    }
  }

  handleItemToggle(name) {
    const { ...state } = this.state;
    this.setState({ [name]: !state[name] });
  }

  render() {
    const { channel, users } = this.props;
    const { details, members } = this.state;

    if (!channel) {
      return null;
    }

    const dateCreated = dateUtil(channel.createdAt).monthDayYear();
    const usersLen = channel.members.length;

    return (
      <div className="ChannelDetailsDrawer">
        <div className="ChannelDetailsDrawer__section">
          <h3 className="ChannelDetailsDrawer__section-title">
            <Button buttonFor="accordion" unStyled onClick={() => this.handleItemToggle('details')}>
              <FontAwesomeIcon icon="info-circle" />
              Channel Details
            </Button>
          </h3>
          {details && (
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
            <Button buttonFor="accordion" unStyled onClick={() => this.handleItemToggle('members')}>
              <FontAwesomeIcon icon="users" />
              {`${usersLen} Members`}
            </Button>
          </h3>
          {members && (
            <div className="ChannelDetailsDrawer__section-body">
              {channel.members.map(userSlug => (
                <div key={userSlug} className="ChannelDetailsDrawer__member">
                  <StatusIcon member={users[userSlug]} />
                  <Avatar author={users[userSlug]} size="22" />
                  {users[userSlug].username}
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

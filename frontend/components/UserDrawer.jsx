import React from 'react';
import Button from './Button';
import StatusIcon from './StatusIcon';
import withDrawer from './withDrawer';
import UserProfileEditor from './UserEditor';
import { dateUtil } from '../util/dateUtil';
import './UserDrawer.css';

class UserDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isEditing: false };
    this.handleClick = this.handleClick.bind(this);
    this.handleEditToggle = this.handleEditToggle.bind(this);
  }

  user() {
    const { match: { params: { userSlug } }, members } = this.props;
    return members[userSlug];
  }

  handleClick() {
    const {
      history,
      createChannelRequest,
      match: { params: { workspaceSlug } },
    } = this.props;

    if (!this.user()) {
      return;
    }

    const { dmChat } = this.user();

    if (dmChat) {
      history.replace(`/${workspaceSlug}/messages/${dmChat}`);
    } else {
      createChannelRequest({ workspaceSlug, hasDm: true, memberId: this.user().id });
    }
  }

  handleEditToggle() {
    const { isEditing } = this.state;
    this.setState({ isEditing: !isEditing });
  }

  render() {
    const { currentUser } = this.props;
    const { isEditing } = this.state;
    const member = this.user();

    if (!member) {
      return null;
    }

    const { username, dmChat, slug } = member;
    const isNotCurrUser = currentUser.slug !== slug;
    const dateJoined = dateUtil(member.joinedAt).monthDayYear();

    let profileText = `You haven't direct messaged ${username} yet. Why not say hi?`;
    if (dmChat) {
      profileText = '';
    } else if (!isNotCurrUser) {
      profileText = 'This is your profile area where you can edit your settings.';
    }

    return (
      <div className="UserDrawer">
        <div className="UserDrawer__banner">
          <img src={member.avatarBanner} alt={`${username} banner`} />
        </div>
        <div className="UserDrawer__body">
          <header className="UserDrawer__header">
            <h2 className="UserDrawer__title">
              {username}
            </h2>
            <StatusIcon member={member} />
          </header>
          <div className="UserDrawer__intro">
            <p>{profileText}</p>
          </div>
          {isNotCurrUser && (
            <div className="UserDrawer__info">
              <div className="UserDrawer__row">
                <div className="UserDrawer__col">
                  Email
                </div>
                <div className="UserDrawer__col">
                  {member.email}
                </div>
              </div>
              <div className="UserDrawer__row">
                <div className="UserDrawer__col">
                  Joined
                </div>
                <div className="UserDrawer__col">
                  {dateJoined}
                </div>
              </div>
            </div>
          )}
          {isNotCurrUser && (
            <Button buttonFor="dm" onClick={this.handleClick}>
              Message
            </Button>
          )}
          {(!isEditing && !isNotCurrUser) && (
            <Button buttonFor="edit-user" onClick={this.handleEditToggle}>
              Edit Profile
            </Button>
          )}
          {isEditing && !isNotCurrUser && (
            <UserProfileEditor user={member} toggleEditor={this.handleEditToggle} />
          )}
        </div>
      </div>
    );
  }
}

export default withDrawer('Workspace Directory')(UserDrawer);

import React from 'react';
import Button from './Button';
import StatusIcon from './StatusIcon';
import { dateUtil } from '../util/dateUtil';
import './UserDrawer.css';

class UserDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick() {
    const {
      history,
      createChannelRequest,
      workspaceSlug,
      user,
    } = this.props;
    const { dmChat, id: memberId } = user;

    if (dmChat) {
      history.replace(`/${workspaceSlug}/messages/${dmChat}`);
    } else {
      createChannelRequest({ workspaceSlug, hasDm: true, memberId });
    }
  }

  render() {
    const { currentUserSlug, openModal, user } = this.props;

    if (!user) {
      return null;
    }

    const isNotCurrUser = currentUserSlug !== user.slug;
    const dateJoined = dateUtil(user.joinedAt).monthDayYear();

    let profileText = `You haven't direct messaged ${user.username} yet. Why not say hi?`;
    if (user.dmChat) {
      profileText = '';
    } else if (!isNotCurrUser) {
      profileText = 'This is your profile area where you can edit your settings.';
    }

    return (
      <div className="UserDrawer">
        <div className="UserDrawer__banner">
          <img src={user.avatarBanner} alt={`${user.username} banner`} />
        </div>
        <div className="UserDrawer__body">
          <header className="UserDrawer__header">
            <h2 className="UserDrawer__title">{user.username}</h2>
            <StatusIcon member={user} />
          </header>
          <div className="UserDrawer__intro">
            <p>{profileText}</p>
          </div>
          {isNotCurrUser && (
            <div className="UserDrawer__info">
              <div className="UserDrawer__row">
                <div className="UserDrawer__col">Email</div>
                <div className="UserDrawer__col">{user.email}</div>
              </div>
              <div className="UserDrawer__row">
                <div className="UserDrawer__col">Joined</div>
                <div className="UserDrawer__col">{dateJoined}</div>
              </div>
            </div>
          )}
          {isNotCurrUser && (
            <Button buttonFor="dm" onClick={this.handleButtonClick}>Message</Button>
          )}
          {isNotCurrUser || (
            <Button buttonFor="edit-user" onClick={() => openModal('MODAL_PROFILE')}>
              Edit Profile
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default UserDrawer;

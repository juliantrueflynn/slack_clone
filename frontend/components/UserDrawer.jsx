import React from 'react';
import Button from './Button';
import StatusIcon from './StatusIcon';
import { dateUtil } from '../util/dateUtil';
import './UserDrawer.css';

class UserDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const {
      match: { params: { workspaceSlug } },
      history,
      createChannelRequest,
      members,
      userSlug,
    } = this.props;
    const user = members[userSlug];

    if (!user) {
      return;
    }

    const { dmChat, id: memberId } = user;

    if (dmChat) {
      history.replace(`/${workspaceSlug}/messages/${dmChat}`);
    } else {
      createChannelRequest({ workspaceSlug, hasDm: true, memberId });
    }
  }

  render() {
    const {
      currentUser,
      openProfileModal,
      members,
      userSlug,
    } = this.props;
    const user = members[userSlug];

    if (!user) {
      return null;
    }

    const { username, dmChat, slug } = user;
    const isNotCurrUser = currentUser.slug !== slug;
    const dateJoined = dateUtil(user.joinedAt).monthDayYear();

    let profileText = `You haven't direct messaged ${username} yet. Why not say hi?`;
    if (dmChat) {
      profileText = '';
    } else if (!isNotCurrUser) {
      profileText = 'This is your profile area where you can edit your settings.';
    }

    return (
      <div className="UserDrawer">
        <div className="UserDrawer__banner">
          <img src={user.avatarBanner} alt={`${username} banner`} />
        </div>
        <div className="UserDrawer__body">
          <header className="UserDrawer__header">
            <h2 className="UserDrawer__title">
              {username}
            </h2>
            <StatusIcon member={user} />
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
                  {user.email}
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
          {isNotCurrUser || (
            <Button buttonFor="edit-user" onClick={() => openProfileModal()}>
              Edit Profile
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default UserDrawer;

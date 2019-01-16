import React from 'react';
import Button from '../Button';
import StatusIcon from '../StatusIcon';
import './styles.css';

class DrawerUser extends React.Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.openProfileModal = this.openProfileModal.bind(this);
  }

  handleButtonClick() {
    const {
      history,
      createChatroomRequest,
      workspaceSlug,
      user,
    } = this.props;
    const { dmChat, id: memberId } = user;

    if (dmChat) {
      history.replace(`/${workspaceSlug}/messages/${dmChat}`);
    } else {
      createChatroomRequest({ workspaceSlug, hasDm: true, memberId });
    }
  }

  openProfileModal() {
    const { openModal } = this.props;
    openModal('MODAL_PROFILE');
  }

  render() {
    const { isLoading, currentUserSlug, user } = this.props;

    if (!user || isLoading) {
      return null;
    }

    const isNotCurrUser = currentUserSlug !== user.slug;

    let profileText = `You haven't direct messaged ${user.username} yet. Why not say hi?`;
    if (user.dmChat) {
      profileText = '';
    } else if (!isNotCurrUser) {
      profileText = 'This is your profile area where you can edit your settings.';
    }

    return (
      <div className="DrawerUser">
        <div className="DrawerUser__banner">
          <img src={user.avatarBanner} alt={`${user.username} banner`} />
        </div>
        <div className="DrawerUser__body">
          <header className="DrawerUser__header">
            <h2 className="DrawerUser__title">{user.username}</h2>
            <StatusIcon member={user} />
          </header>
          <div className="DrawerUser__intro">
            <p>{profileText}</p>
          </div>
          {isNotCurrUser && (
            <div className="DrawerUser__info">
              <div className="DrawerUser__row">
                <div className="DrawerUser__col">Email</div>
                <div className="DrawerUser__col">{user.email}</div>
              </div>
              <div className="DrawerUser__row">
                <div className="DrawerUser__col">Joined</div>
                <div className="DrawerUser__col">{user.joinedAt}</div>
              </div>
            </div>
          )}
          {isNotCurrUser && (
            <Button buttonFor="dm" onClick={this.handleButtonClick}>Message</Button>
          )}
          {isNotCurrUser || (
            <Button buttonFor="edit-user" onClick={this.openProfileModal}>Edit Profile</Button>
          )}
        </div>
      </div>
    );
  }
}

export default DrawerUser;

import React from 'react';
import SettingsForm from './SettingsForm';
import PasswordForm from './PasswordForm';
import Button from './Button';
import Modal from './Modal';
import './ProfileModal.css';

class ProfileModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tabOpen: 'user' };
    this.handleTabClick = this.handleTabClick.bind(this);
  }

  handleTabClick(tabOpen) {
    return () => this.setState({ tabOpen });
  }

  render() {
    const { modalClose, ...props } = this.props;
    const { tabOpen } = this.state;
    const { avatarLarge, username, email } = props;
    const user = { avatarLarge, username, email };
    const classNames = `ProfileModal ProfileModal__${tabOpen}`;
    const tabTitle = tabOpen === 'user' ? 'Edit Settings' : 'Change Password';

    return (
      <Modal isOpen modalTitle="Edit your profile" modalFor="profile" close={modalClose}>
        <div className={classNames}>
          <div className="ProfileModal__tabs">
            <Button buttonFor="user-tab" onClick={this.handleTabClick('user')}>
              Edit Settings
            </Button>
            <Button buttonFor="pw-tab" onClick={this.handleTabClick('password')}>
              Change Password
            </Button>
          </div>
          <div className="ProfileModal__body">
            <h2 className="ProfileModal__title">
              {tabTitle}
            </h2>
            {tabOpen === 'user' && (
              <SettingsForm modalClose={modalClose} user={user} />
            )}
            {tabOpen === 'password' && (
              <PasswordForm modalClose={modalClose} />
            )}
          </div>
        </div>
      </Modal>
    );
  }
}

export default ProfileModal;

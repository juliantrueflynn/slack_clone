import React from 'react';
import withModal from './withModal';
import SettingsForm from './SettingsForm';
import PasswordForm from './PasswordForm';
import Button from './Button';
import './ProfileModal.css';

class ProfileModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tabOpen: 'user' };
    this.handleTabClick = this.handleTabClick.bind(this);
  }

  handleTabClick(tabOpen) {
    return () => {
      const { destroySuccess, success } = this.props;

      if (success[tabOpen]) {
        destroySuccess(tabOpen);
      }

      this.setState({ tabOpen });
    };
  }

  render() {
    const { modalClose, success, ...props } = this.props;
    const { tabOpen } = this.state;
    const { profilePhoto, username, email } = props;
    const user = { profilePhoto, username, email };
    const classNames = `ProfileModal ProfileModal__${tabOpen}`;
    const tabTitle = tabOpen === 'user' ? 'Edit Settings' : 'Change Password';
    const successMessage = success[tabOpen];

    return (
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
          {successMessage && (
            <div className="Form__success">
              {successMessage}
            </div>
          )}
          {tabOpen === 'user' && (
            <SettingsForm modalClose={modalClose} user={user} />
          )}
          {tabOpen === 'password' && (
            <PasswordForm modalClose={modalClose} />
          )}
        </div>
      </div>
    );
  }
}

const modalProps = {
  modalType: 'MODAL_PROFILE',
  modalTitle: 'Edit your profile'
};

export default withModal(modalProps)(ProfileModal);

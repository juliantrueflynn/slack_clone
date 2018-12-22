import React, { Fragment } from 'react';
import SettingsForm from './SettingsForm';
import PasswordForm from './PasswordForm';
import Button from './Button';
import './ModalProfile.css';

class ModalProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tabOpen: 'user' };
  }

  handleTabClick(tabOpen) {
    return () => this.setState({ tabOpen });
  }

  render() {
    const {
      close,
      user,
      updateUserRequest,
      updatePasswordRequest,
    } = this.props;
    const { tabOpen } = this.state;
    const classNames = `ModalProfile ModalProfile__${tabOpen}`;
    const tabTitle = tabOpen === 'user' ? 'Edit Settings' : 'Change Password';

    return (
      <Fragment>
        <div className={classNames}>
          <div className="ModalProfile__tabs">
            <Button buttonFor="user-tab" onClick={this.handleTabClick('user')}>
              Edit Settings
            </Button>
            <Button buttonFor="pw-tab" onClick={this.handleTabClick('password')}>
              Change Password
            </Button>
          </div>
          <div className="ModalProfile__body">
            <h2 className="ModalProfile__title">{tabTitle}</h2>
            {tabOpen === 'user' && (
              <SettingsForm close={close} user={user} updateUserRequest={updateUserRequest} />
            )}
            {tabOpen === 'password' && (
              <PasswordForm close={close} updatePasswordRequest={updatePasswordRequest} />
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ModalProfile;

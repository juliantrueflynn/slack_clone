import React, { Fragment } from 'react';
import SettingsForm from '../SettingsForm';
import PasswordForm from '../PasswordForm';
import Button from '../Button';
import './styles.css';

class ModalProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tabOpen: 'user' };
    this.handleTabClick = this.handleTabClick.bind(this);
  }

  handleTabClick(e) {
    const tabOpen = e.target.getAttribute('data-tab');
    this.setState({ tabOpen });
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
            <Button buttonFor="tab-user" data-tab="user" onClick={this.handleTabClick} unStyled>
              Edit Settings
            </Button>
            <Button buttonFor="tab-pw" data-tab="password" onClick={this.handleTabClick} unStyled>
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

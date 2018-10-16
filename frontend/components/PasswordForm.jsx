import React from 'react';
import withForm from './withForm';
import Button from './Button';

class PasswordForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      newPassword: '',
      passwordVerify: '',
    };

    this.handleTextInputValue = this.handleTextInputValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { formDispatchRequest } = this.props;
    const { password, newPassword, passwordVerify } = this.state;
    formDispatchRequest({ password, newPassword, passwordVerify });
  }

  handleTextInputValue(name) {
    return event => this.setState({ [name]: event.target.value });
  }

  render() {
    const { modalClose } = this.props;
    const { password, newPassword, passwordVerify } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="Form__group">
          <label htmlFor="password">
            Current password
          </label>
          <input
            type="password"
            className="Form__control"
            name="user[password]"
            value={password}
            onChange={this.handleTextInputValue('password')}
          />
        </div>
        <div className="Form__group">
          <label htmlFor="new_password">
            New password
          </label>
          <input
            type="password"
            className="Form__control"
            name="user[new_password]"
            value={newPassword}
            onChange={this.handleTextInputValue('newPassword')}
          />
        </div>
        <div className="Form__group">
          <label htmlFor="password_verify">
            Verify password
          </label>
          <input
            type="password"
            className="Form__control"
            name="user[password_verify]"
            value={passwordVerify}
            onChange={this.handleTextInputValue('passwordVerify')}
          />
        </div>
        <div className="Btn__group">
          <Button type="submit" color="green" buttonFor="save-profile" size="lg">
            Save
          </Button>
          <Button onClick={() => modalClose()} size="lg">
            Cancel
          </Button>
        </div>
      </form>
    );
  }
}

const formProps = { type: 'PASSWORD_UPDATE_REQUEST', payloadName: 'password' };

export default withForm(formProps)(PasswordForm);

import React from 'react';
import Button from './Button';
import FormContainer from './FormContainer';

class PasswordForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      newPassword: '',
      passwordVerify: '',
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFieldValueChange = this.handleFieldValueChange.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const { updatePasswordRequest } = this.props;
    const { password, newPassword, passwordVerify } = this.state;

    updatePasswordRequest({ password, newPassword, passwordVerify });
  }

  handleFieldValueChange(value, prop) {
    this.setState({ [prop]: value });
  }

  render() {
    const { close } = this.props;
    const { password, newPassword, passwordVerify } = this.state;

    const fields = [
      {
        id: 'password',
        type: 'password',
        value: password,
        label: 'Current password',
      },
      {
        id: 'newPassword',
        type: 'password',
        value: newPassword,
        label: 'New password',
      },
      {
        id: 'passwordVerify',
        type: 'password',
        value: passwordVerify,
        label: 'Verify password',
      },
    ];

    return (
      <FormContainer
        formFor="password"
        fields={fields}
        setFieldValue={this.handleFieldValueChange}
        submitForm={this.handleFormSubmit}
      >
        <Button type="submit" color="green" size="lg">Save</Button>
        <Button onClick={close} size="lg">Cancel</Button>
      </FormContainer>
    );
  }
}

export default PasswordForm;

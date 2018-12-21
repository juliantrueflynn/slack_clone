import React from 'react';
import withForm from './withForm';
import Button from './Button';
import FormHandler from './FormHandler';

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

    const { formDispatchRequest } = this.props;
    const { password, newPassword, passwordVerify } = this.state;
    formDispatchRequest({ password, newPassword, passwordVerify });
  }

  handleFieldValueChange(value, prop) {
    this.setState({ [prop]: value });
  }

  render() {
    const { closeModal, form: { formSuccess, formErrors } } = this.props;
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
      <FormHandler
        fields={fields}
        setFieldValue={this.handleFieldValueChange}
        submitForm={this.handleFormSubmit}
        success={formSuccess}
        errors={formErrors}
      >
        <Button type="submit" color="green" size="lg">Save</Button>
        <Button onClick={closeModal} size="lg">Cancel</Button>
      </FormHandler>
    );
  }
}

const formProps = { type: 'PASSWORD_UPDATE_REQUEST', payloadName: 'password' };

export default withForm(formProps)(PasswordForm);

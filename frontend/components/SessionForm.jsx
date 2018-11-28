import React from 'react';
import Button from './Button';
import withPublicView from './withPublicView';
import withForm from './withForm';
import FormHandler from './FormHandler';
import './SessionForm.css';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFieldValueChange = this.handleFieldValueChange.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const { sessionRequest } = this.props;
    const { username, email, password } = this.state;
    const user = { username, email, password };
    sessionRequest(user);
  }

  handleFieldValueChange(value, prop) {
    this.setState({ [prop]: value });
  }

  render() {
    const { location: { pathname }, form: { formErrors } } = this.props;
    const { username, email, password } = this.state;
    const isSignInPage = pathname === '/signin';

    const fields = [
      {
        id: 'username',
        type: 'text',
        value: username,
        placeholder: 'Username',
      },
      {
        id: 'email',
        type: 'text',
        value: email,
        placeholder: 'Email',
      },
      {
        id: 'password',
        type: 'password',
        value: password,
        placeholder: 'Password',
      }
    ];

    return (
      <div className="SessionForm">
        <div className="SessionForm__body">
          <h1 className="Page__title">
            {isSignInPage ? 'Sign in' : 'Sign up'}
          </h1>
          <FormHandler
            fields={fields}
            setFieldValue={this.handleFieldValueChange}
            submitForm={this.handleFormSubmit}
            errors={formErrors}
          >
            <Button type="submit" buttonFor="submit" fullWidth>
              {isSignInPage ? 'Sign in' : 'Sign Up'}
            </Button>
          </FormHandler>
        </div>
      </div>
    );
  }
}

const formProps = { payloadName: 'session' };

export default withPublicView(withForm(formProps)(SessionForm));

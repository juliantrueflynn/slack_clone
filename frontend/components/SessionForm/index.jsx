import React from 'react';
import Button from '../Button';
import withPublicView from '../../hoc/withPublicView';
import FormContainer from '../../containers/FormContainer';
import './styles.css';

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
    const { location: { pathname } } = this.props;
    const { username, email, password } = this.state;
    const isSignInPage = pathname === '/signin';
    const sessionText = isSignInPage ? 'Sign in' : 'Sign up';

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
          <h1 className="Page__title">{sessionText}</h1>
          <FormContainer
            fields={fields}
            setFieldValue={this.handleFieldValueChange}
            submitForm={this.handleFormSubmit}
          >
            <Button type="submit" color="green" size="lg">{sessionText}</Button>
          </FormContainer>
        </div>
      </div>
    );
  }
}

export default withPublicView(SessionForm);

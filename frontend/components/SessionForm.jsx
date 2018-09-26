import React from 'react';
import Button from './Button';
import FormErrors from './FormErrors';
import withPublicView from './withPublicView';
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
  }

  handleFormSubmit(event) {
    event.preventDefault();

    const { sessionRequest } = this.props;
    const { username, email, password } = this.state;
    const user = { username, email, password };
    sessionRequest(user);
  }

  handleInputValue(field) {
    return event => this.setState({ [field]: event.target.value });
  }

  render() {
    const { location: { pathname } } = this.props;
    const { username, email, password } = this.state;
    const isSignInPage = pathname === '/signin';

    return (
      <div className="SessionForm">
        <div className="SessionForm__body">
          <h1 className="Page__title">
            {isSignInPage ? 'Sign in' : 'Sign up'}
          </h1>

          <form className="Form__session" onSubmit={this.handleFormSubmit}>
            <FormErrors entity="session" />
            <div className="Form__group">
              <input
                type="text"
                className="Form__control"
                placeholder="Username"
                value={username}
                onChange={this.handleInputValue('username')}
              />
            </div>
            <div className="Form__group">
              <input
                type="text"
                className="Form__control"
                placeholder="Email"
                value={email}
                onChange={this.handleInputValue('email')}
              />
            </div>
            <div className="Form__group">
              <input
                type="password"
                className="Form__control"
                placeholder="Password"
                value={password}
                onChange={this.handleInputValue('password')}
              />
            </div>
            <Button type="submit" buttonFor="submit" fullWidth>
              {isSignInPage ? 'Sign in' : 'Sign Up'}
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default withPublicView(SessionForm);

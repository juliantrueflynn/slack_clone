import React from 'react';
import Button from './Button';
import Form from './Form';
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

          <Form formFor="session" onSubmit={this.handleFormSubmit}>
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
            <Button className="Btn__submit Btn__w100" type="submit">
              {isSignInPage ? 'Sign in' : 'Sign Up'}
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default withPublicView(SessionForm);

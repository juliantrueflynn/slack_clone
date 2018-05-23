import React from 'react';
import { Link } from 'react-router-dom';
import FormErrors from '../Layout/FormErrors';

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
    const { username, email, password } = this.state;
    const user = { username, email, password };
    this.props.sessionRequest(user);
  }

  handleInputValue(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  render() {
    const { isSignInPage } = this.props;

    return (
      <div className={`page page__${isSignInPage ? 'sigin' : 'signup'}`}>
        {isSignInPage && (<h1>Sign in to your workspace</h1>)}
        {isSignInPage || (<h1>Create a new workspace</h1>)}

        <FormErrors entity="session" />

        <form className="form form__session" onSubmit={this.handleFormSubmit}>
          <div className="form__group">
            <input
              type="text"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleInputValue('username')}
            />
          </div>
          <div className="form__group">
            <input
              type="text"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleInputValue('email')}
            />
          </div>
          <div className="form__group">
            <input
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleInputValue('password')}
            />
          </div>
          <input
            type="submit"
            value={isSignInPage ? 'Sign in' : 'Create'}
          />
        </form>

        {isSignInPage && (<Link to="/signup">Create a new workspace</Link>)}
        {isSignInPage || (<Link to="/signin">Sign in</Link>)}
      </div>
    );
  }
}

export default SessionForm;
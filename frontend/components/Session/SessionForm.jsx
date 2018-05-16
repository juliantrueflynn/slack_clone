import React from 'react';
import { Link } from 'react-router-dom';
import FormErrors from '../FormErrors';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: [],
      username: '',
      email: '',
      password: '',
      pathname: '',
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors.length !== prevState.errors.length) {
      return { errors: [...nextProps.errors] };
    }
  
    if (nextProps.location.pathname !== prevState.pathname) {
      return { errors: [] };
    }
    
    return null;
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  handleInputValue(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  render() {
    const { isSignInPage } = this.props;

    return (
      <div className="form form__session">
        {isSignInPage ? (
          <h1>Sign in to your workspace</h1>
        ) : (
          <h1>Create a new workspace</h1>
        )}

        <FormErrors errors={this.state.errors} />

        <form onSubmit={this.handleFormSubmit}>
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

        {isSignInPage ? (
          <Link to="/signup">Create a new workspace</Link>
        ) : (
          <Link to="/signin">Sign in</Link>
        )}
      </div>
    );
  }
}

export default SessionForm;
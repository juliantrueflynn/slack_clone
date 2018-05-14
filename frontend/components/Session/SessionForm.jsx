import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class ChannelSessionForm extends React.Component {
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
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  handleInputValue(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  errors() {
    if (this.props.errors.length) {
      return (
        <ul className="errors errors__form">
          {this.props.errors.map((error, i) => (
            <li className="errors__item" key={`error${i}`}>
              {error}
            </li>
          ))}
        </ul>
      );
    }
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

        {this.errors()}

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

export default withRouter(ChannelSessionForm);
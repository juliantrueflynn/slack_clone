import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class ChannelSessionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  handleInputValue(field) {
    return e => this.setState({
      [field]: e.target.value
    });
  }

  render() {
    const { loggedIn, formType } = this.props;

    return (
      <div>
        {
          formType === '/signin'
            ? <h1>Sign in to your workspace</h1>
            : <h1>Create a new workspace</h1>
        }
        <form onSubmit={ this.handleFormSubmit }>
          <div>
            <input
              type="text"
              placeholder="Username"
              value={ this.state.username }
              onChange={ this.handleInputValue('username') } />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={ this.state.email }
              onChange={ this.handleInputValue('email') } />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={ this.state.password }
              onChange={ this.handleInputValue('password') } />
          </div>
          <input type="submit" value={ formType === '/signin' ? 'Sign in' : 'Create'
        } />
        </form>

        {
          formType === '/signin'
            ? <Link to="/signup">Create a new workspace</Link>
            : <Link to="/signin">Sign in</Link>
        }
      </div>
    );
  }
}

export default withRouter(ChannelSessionForm);
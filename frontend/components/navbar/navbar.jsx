import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logout();
  }

  render() {
    const { loggedIn, currentUser } = this.props;

    return (
      <header>
        <Link to="/">Slack Clone</Link>
        <nav>
          <ul>
            { !loggedIn && <li><Link to="/signup">Sign up</Link></li> }
            { !loggedIn && <li><Link to="/signin">Sign in</Link></li> }
            { loggedIn && <li><button onClick={ this.handleLogout }>Logout</button></li> }
          </ul>
        </nav>
      </header>
    );
  }
}

export default NavBar;
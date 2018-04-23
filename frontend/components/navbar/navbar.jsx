import React from 'react';
import { Link } from 'react-router-dom';
import WorkspaceMenuContainer
  from '../workspace_menu/workspace_menu_container';

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut() {
    this.props.requestSignOut();
  }

  render() {
    const { loggedIn, currentUser } = this.props;

    return (
      <header>
        <Link to="/">Slack Clone</Link>
        <nav className="navbar navbar__primary">
          <ul>
            { !loggedIn && <li><Link to="/signup">Sign up</Link></li> }
            { !loggedIn && <li><Link to="/signin">Sign in</Link></li> }
            {
              loggedIn &&
                <li><button onClick={ this.handleSignOut }>Logout</button></li>
            }
          </ul>

          <WorkspaceMenuContainer />
        </nav>
      </header>
    );
  }
}

export default NavBar;
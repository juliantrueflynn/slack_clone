import React from 'react';
import { Link } from 'react-router-dom';
import WorkspacesMenuContainer from '../WorkspacesMenu/WorkspacesMenuContainer';
import './NavBar.css';

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut() {
    this.props.signOutRequest();
  }

  render() {
    const { loggedIn } = this.props;

    return (
      <header className="header header__home">
        <div className="content-container content-container__boxed-width">
          <nav className="navbar navbar__primary">
            <Link to="/">Slack Clone</Link>
            
            <ul className="menu menu__primary-menu">
              {!loggedIn && (<li><Link to="/signup">Sign up</Link></li>)}
              {!loggedIn && (<li><Link to="/signin">Sign in</Link></li>)}
              {loggedIn && (
                <li>
                  <button onClick={this.handleSignOut}>Logout</button>
                </li>
              )}
            </ul>

            <WorkspacesMenuContainer />
          </nav>
        </div>
      </header>
    );
  }
}

export default NavBar;
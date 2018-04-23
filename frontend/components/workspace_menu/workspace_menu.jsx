import React from 'react';
import WorkspaceMenuItem from './workspace_menu_item';
import { withRouter, Route, Link } from 'react-router-dom';

class WorkspaceMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isDropdownOpen: false };
    this.handleDropdownToggle = this.handleDropdownToggle.bind(this);
  }

  componentDidMount() {
    const { loggedIn, requestWorkspaces } = this.props;
    if (loggedIn) requestWorkspaces();
  }

  handleDropdownToggle(event) {
    event.preventDefault();
    this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
  }

  render() {
    const { workspaces, loggedIn } = this.props;
    const workspaceList = workspaces.map(workspace => (
      <WorkspaceMenuItem workspace={ workspace } key={ workspace.id } />
    ));

    if (!loggedIn) return null;

    return (
      <div>
        <button onClick={ this.handleDropdownToggle }>Your Workspaces</button>
        { this.state.isDropdownOpen && <ul>{ workspaceList }</ul> }
      </div>
    );
  }
}

export default WorkspaceMenu;
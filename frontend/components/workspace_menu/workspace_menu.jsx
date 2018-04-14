import React from 'react';
import WorkspaceMenuItem from './workspace_menu_item';
import { withRouter, Route, Link } from 'react-router-dom';

class WorkspaceMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { loggedIn, requestWorkspaces } = this.props;
    if (loggedIn) requestWorkspaces();
  }

  render() {
    const { workspaces, loggedIn } = this.props;
    const workspaceList = workspaces.map(workspace => (
      <WorkspaceMenuItem workspace={ workspace } key={ workspace.id } />
    ));

    if ( !loggedIn ) return null;

    return (
      <div>
        <span>Your Workspaces:</span><br/>
        <ul>
          { workspaceList }
        </ul>
      </div>
    );
  }
}

export default WorkspaceMenu;
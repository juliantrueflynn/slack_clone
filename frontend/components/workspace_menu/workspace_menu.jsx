import React from 'react';
import WorkspaceMenuItem from './workspace_menu_item';
import { withRouter, Route, Link } from 'react-router-dom';

class WorkspaceMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.requestWorkspaces();
  }

  render() {
    const { workspaces } = this.props;
    const workspaceList = workspaces.map(workspace => (
      <WorkspaceMenuItem workspace={ workspace } key={ workspace.id } />
    ));

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
import React from 'react';
import WorkspaceMenuItem from './workspace_menu_item';

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

    if (!loggedIn) return null;

    return (
      <div>
        <button onClick={ this.handleDropdownToggle }>Your Workspaces</button>
        {this.state.isDropdownOpen &&
          <ul>
            {workspaces.map(workspace => (
              <WorkspaceMenuItem
                workspace={ workspace }
                key={ workspace.slug }
              />
            ))}
          </ul>
        }
      </div>
    );
  }
}

export default WorkspaceMenu;
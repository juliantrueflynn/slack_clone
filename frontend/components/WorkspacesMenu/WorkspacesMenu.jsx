import React from 'react';
import WorkspacesMenuItem from './WorkspacesMenuItem';
import Dropdown from '../Layout/Dropdown';

class WorkspacesMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isDropdownOpen: false };
    this.handleDropdownToggle = this.handleDropdownToggle.bind(this);
  }

  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.fetchWorkspacesRequest();
    }
  }

  handleDropdownToggle() {
    this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
  }

  render() {
    return (
      <Dropdown menuFor="workspaces" togglerText="Workspaces">
        {this.props.workspaces.map(workspace => (
          <WorkspacesMenuItem
            workspace={workspace}
            key={workspace.slug}
            dropdownToggle={this.handleDropdownToggle}
          />
        ))}
      </Dropdown>
    );
  }
}

export default WorkspacesMenu;

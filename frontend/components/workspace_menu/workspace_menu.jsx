import React from 'react';
import WorkspaceMenuItem from './workspace_menu_item';

class WorkspaceMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isDropdownOpen: false };
    this.setNodeToDropdown = this.setNodeToDropdown.bind(this);
    this.handleDropdownClickOut = this.handleDropdownClickOut.bind(this);
    this.handleDropdownToggle = this.handleDropdownToggle.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleDropdownClickOut);
    const { loggedIn, workspacesRequest } = this.props;
    if (loggedIn) workspacesRequest();
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleDropdownClickOut);
  }

  handleDropdownToggle(event) {
    event.preventDefault();
    this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
  }

  setNodeToDropdown(node) {
    this.wrapperRef = node;
  }

  handleDropdownClickOut(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ isDropdownOpen: false });
    }
  }

  render() {
    const { workspaces, loggedIn } = this.props;
    const { isDropdownOpen, classNames } = this.state;
    
    if (!loggedIn) return null;
    return (
      <div className="dropdown dropdown__workspaces">
        <button className="dropdown" onClick={ this.handleDropdownToggle }>
          Your Workspaces
        </button>
        {isDropdownOpen &&
          <ul ref={ this.setNodeToDropdown }>
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
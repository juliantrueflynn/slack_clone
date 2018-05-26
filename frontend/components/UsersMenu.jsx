import React from 'react';
import DropdownMenu from './Layout/DropdownMenu';

class UsersMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <DropdownMenu menuFor="user" togglerText={this.props.workspaceSlug}>
        <li>
          Works
        </li>
      </DropdownMenu>
    );
  }
}

export default UsersMenu;
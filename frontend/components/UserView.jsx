import React from 'react';
import RightSidebarContainer from './Layout/RightSidebarContainer';

class UserView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <RightSidebarContainer
        sidebarTitle="Workspace Directory"
        match={this.props.match}
      >
        Works
      </RightSidebarContainer>
    );
  }
}

export default UserView;
import React from 'react';
import RightSidebarContainer from './Layout/RightSidebarContainer';

class UserView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.openRightSidebar();
  }

  componentDidUpdate(prevProps) {
    const { match: { params, path }, openRightSidebar } = this.props;
    const userPath = '/:workspaceSlug/:channelSlug/team/:userSlug';
    
    if (path === userPath && prevProps.match.path !== userPath) {
      openRightSidebar({ userSlug: params.userSlug });
    }
  }

  render() {
    const { user, match } = this.props;

    if (!user) {
      return null;
    }

    return (
      <RightSidebarContainer
        sidebarTitle="Workspace Directory"
        match={match}
      >
        {user.username}
      </RightSidebarContainer>
    );
  }
}

export default UserView;
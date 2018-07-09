import React from 'react';
import RightSidebarContainer from './Layout/RightSidebarContainer';

class UserView extends React.Component {
  componentDidMount() {
    const { user, fetchMemberRequest } = this.props;
    if (user) fetchMemberRequest(user.slug);
  }

  render() {
    const { user, match } = this.props;

    if (!user) {
      return null;
    }

    return (
      <RightSidebarContainer sidebarType="Workspace Directory" match={match}>
        {user.username}
      </RightSidebarContainer>
    );
  }
}

export default UserView;

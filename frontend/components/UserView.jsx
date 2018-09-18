import React from 'react';
import RightSidebarContainer from './RightSidebarContainer';
import Button from './Button';

class UserView extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { user, fetchMemberRequest } = this.props;

    if (user) {
      fetchMemberRequest(user.slug);
    }
  }

  handleClick() {
    const {
      user,
      history,
      createDmChatRequest,
      hasDmWith,
      match: { params: { workspaceSlug } },
    } = this.props;

    if (hasDmWith) {
      history.push(`/${workspaceSlug}/messages/${hasDmWith.slug}`);
    } else {
      createDmChatRequest({ workspaceSlug, memberIds: [user.id] });
    }
  }

  render() {
    const {
      user,
      userSlug,
      isChannelsLoaded,
    } = this.props;

    if (!user || !isChannelsLoaded) return null;

    const sidebarProps = { path: `/team/${userSlug}` };

    return (
      <RightSidebarContainer
        sidebarType="Workspace Directory"
        sidebarProps={sidebarProps}
      >
        {user.username}
        <div className="profile__actions">
          <Button buttonFor="dm" onClick={this.handleClick}>
            Message
          </Button>
        </div>
      </RightSidebarContainer>
    );
  }
}

export default UserView;

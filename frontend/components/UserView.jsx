import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import RightSidebarContainer from './RightSidebarContainer';
import Button from './Button';

class UserView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { didCreateDmChat: false };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { user, fetchMemberRequest } = this.props;
    if (user) fetchMemberRequest(user.slug);
  }

  handleClick() {
    const {
      workspaceId,
      user,
      createDmChatRequest
    } = this.props;
    createDmChatRequest({ workspaceId, memberIds: [user.id] });
    this.setState({ didCreateDmChat: true });
  }

  render() {
    const {
      hasDmWith,
      user,
      userSlug,
      isChannelsLoaded,
      match: { params: { workspaceSlug } },
    } = this.props;
    const { didCreateDmChat } = this.state;

    if (!user || !isChannelsLoaded) return null;

    if (hasDmWith && didCreateDmChat) {
      return <Redirect to={`/${workspaceSlug}/${hasDmWith.slug}`} />;
    }

    const sidebarProps = { path: `/team/${userSlug}` };

    return (
      <RightSidebarContainer
        sidebarType="Workspace Directory"
        sidebarProps={sidebarProps}
      >
        {user.username}
        <div className="profile__actions">
          {hasDmWith ? (
            <Link to={`/${workspaceSlug}/${hasDmWith.slug}`}>
              Message
            </Link>
          ) : (
            <Button buttonFor="dm" onClick={this.handleClick}>
              Message
            </Button>
          )}
        </div>
      </RightSidebarContainer>
    );
  }
}

export default UserView;

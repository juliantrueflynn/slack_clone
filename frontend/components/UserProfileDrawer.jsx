import React from 'react';
import Button from './Button';
import withDrawer from './withDrawer';

class UserProfileDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  user() {
    const { match: { params: { userSlug } }, members } = this.props;
    return members[userSlug];
  }

  handleClick() {
    const {
      history,
      createDmChatRequest,
      match: { params: { workspaceSlug } },
    } = this.props;

    if (!this.user()) {
      return;
    }

    const { dmChat } = this.user();

    if (dmChat) {
      history.push(`/${workspaceSlug}/messages/${dmChat}`);
    } else {
      createDmChatRequest({ workspaceSlug, memberId: this.user().id });
    }
  }

  render() {
    const { currentUser } = this.props;

    if (!this.user()) {
      return null;
    }

    const { username, slug } = this.user();
    const isNotCurrUser = currentUser.slug !== slug;

    return (
      <div className="UserProfileDrawer">
        {username}
        {isNotCurrUser && (
          <div className="profile__actions">
            <Button buttonFor="dm" onClick={this.handleClick}>
              Message
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default withDrawer('Workspace Directory')(UserProfileDrawer);

import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import './PublicWorkspacesItem.css';

class PublicWorkspacesItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubscribe = this.handleSubscribe.bind(this);
  }

  isSubscriber() {
    const { currentUser, workspace: { members } } = this.props;
    return members.includes(currentUser.slug);
  }

  handleSubscribe() {
    const {
      workspace: { id: workspaceId },
      createWorkspaceSubRequest,
      deleteWorkspaceSubRequest,
    } = this.props;
    if (this.isSubscriber()) {
      deleteWorkspaceSubRequest(workspaceId);
    } else {
      createWorkspaceSubRequest({ workspaceId });
    }
  }

  render() {
    const { workspace } = this.props;
    const buttonText = this.isSubscriber() ? 'Unsubscribe' : 'Subscribe';
    const buttonModifier = this.isSubscriber() ? 'unsub' : 'sub';

    return (
      <div key={workspace.id} className="PublicWorkspaces__item" role="listitem">
        <Link to={workspace.slug} className="PublicWorkspaces__item-title">
          {workspace.title}
        </Link>
        <Button
          buttonFor="workspace-sub"
          size="sm"
          modifier={buttonModifier}
          onClick={this.handleSubscribe}
          style={{ border: 'none' }}
        >
          {buttonText}
        </Button>
      </div>
    );
  }
}

export default PublicWorkspacesItem;

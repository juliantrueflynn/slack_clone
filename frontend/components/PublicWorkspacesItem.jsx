import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import './PublicWorkspacesItem.css';

class PublicWorkspacesItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubscribe = this.handleSubscribe.bind(this);
  }

  handleSubscribe() {
    const {
      workspace,
      createWorkspaceSubRequest,
      updateWorkspaceSubRequest,
      currentUser: { slug: userSlug },
    } = this.props;
    const workspaceSub = { workspaceId: workspace.id, workspaceSlug: workspace.slug };

    if (workspace.subId) {
      updateWorkspaceSubRequest({
        id: workspace.subId,
        isMember: !workspace.isMember,
        ...workspaceSub,
      });
    } else {
      createWorkspaceSubRequest({ userSlug, ...workspaceSub });
    }
  }

  render() {
    const { workspace } = this.props;
    const {
      id,
      isMember,
      slug,
      title
    } = workspace;
    const buttonText = isMember ? 'Unsubscribe' : 'Subscribe';
    const buttonModifier = isMember ? 'unsub' : 'sub';

    return (
      <div key={id} className="PublicWorkspaces__item" role="listitem">
        {isMember && (
          <Link to={slug} className="PublicWorkspaces__item-title">
            {title}
          </Link>
        )}
        {isMember || (
          <div to={slug} className="PublicWorkspaces__item-title">
            {title}
          </div>
        )}
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

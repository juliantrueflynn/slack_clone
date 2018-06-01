import React from 'react';
import ChannelPageContainer from '../Channel/ChannelPageContainer';
import { ActionCable } from 'react-actioncable-provider';
import { UserActionCable } from '../../util/actionCableUtil';

class WorkspacePage extends React.Component {
  constructor(props) {
    super(props);

    this.handleReceived = this.handleReceived.bind(this);
  }

  componentDidMount() {
    const { location, workspaceRequest, match } = this.props;
    
    if (location.pathname === match.url) {
      workspaceRequest(match.params.workspaceSlug);
    }
  }

  componentDidUpdate(prevProps) {
    const { location, workspaceRequest, match } = this.props;
    
    if (prevProps.match.url !== match.url) {
      workspaceRequest(match.params.workspaceSlug);
    }
  }

  handleReceived(received) {
    console.log(received);
  }

  render() {
    const { match: { params } } = this.props;

    return (
      <div className="workspace-view">
        <ActionCable 
          channel={{
            channel: 'WorkspaceChannel',
            workspace_slug: params.workspaceSlug
          }}
          onReceived={this.handleReceived}
        />
        <UserActionCable />

        {this.props.children}
      </div>
    );
  }
}

export default WorkspacePage;
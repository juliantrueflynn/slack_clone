import React from 'react';
import ChannelPageContainer from '../Channel/ChannelPageContainer';
import { UserActionCable } from '../../util/actionCableUtil';

class WorkspacePage extends React.Component {
  constructor(props) {
    super(props);
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

  render() {
    const { match: { params } } = this.props;

    return (
      <div className="workspace-view">
        <UserActionCable workspaceSlug={params.workspaceSlug} />
        {this.props.children}
      </div>
    );
  }
}

export default WorkspacePage;
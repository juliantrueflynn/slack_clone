import React from 'react';
import WorkspacePageContainer from './Workspace/WorkspacePageContainer';

class ThreadsPage extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <WorkspacePageContainer match={match}>
        <h1 className="top-bar__title">All Threads</h1>
      </WorkspacePageContainer>
    );
  }
}

export default ThreadsPage;

import React from 'react';
import WorkspacePageContainer from './Workspace/WorkspacePageContainer';
import TopBarHeaderContainer from './TopBarHeaderContainer';

class ThreadsPage extends React.Component {
  componentDidMount() {
  }

  render() {
    const { match } = this.props;

    return (
      <WorkspacePageContainer match={match}>
        <TopBarHeaderContainer sectionTitle="All Threads">
          <small>Thread count here</small>
        </TopBarHeaderContainer>
      </WorkspacePageContainer>
    );
  }
}

export default ThreadsPage;

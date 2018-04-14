import React from 'react';

class WorkspacePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { workspaceSlug } = this.props.match.params;
    this.props.loadWorkspacePage(workspaceSlug);
  }

  componentWillReceiveProps(nextProps) {
    const { workspaceSlug } = this.props.match.params;
    const nextWorkspaceSlug = nextProps.match.params.workspaceSlug;
    if(workspaceSlug !== nextWorkspaceSlug) {
      this.props.loadWorkspacePage(nextWorkspaceSlug);
    }
  }

  render() {
    const { workspaceSlug } = this.props.match.params;
    
    return (
      <div>
        You're on workspace ID #{ workspaceSlug }
      </div>
    );
  }
}

export default WorkspacePage;
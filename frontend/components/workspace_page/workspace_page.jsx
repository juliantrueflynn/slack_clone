import React from 'react';

class WorkspacePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { workspaceSlug } = this.props.match.params;
    this.props.loadWorkspacePage(workspaceSlug, this.props.workspaces);
  }

  componentWillReceiveProps(nextProps) {
    const { workspaceSlug } = this.props.match.params;
    if(workspaceSlug !== nextProps.match.params.workspaceSlug) {
      this.props.loadWorkspacePage(workspaceSlug, this.props.workspaces);
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
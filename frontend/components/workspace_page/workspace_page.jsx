import React from 'react';

class WorkspacePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { workspaceSlug } = this.props.match.params;
    this.props.fetchWorkspace(workspaceSlug);
  }

  render() {
    return (
      <div>
        You're on workspace ID #{ this.props.match.params.workspaceSlug }
      </div>
    );
  }
}

export default WorkspacePage;
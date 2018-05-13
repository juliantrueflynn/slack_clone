import React from 'react';

class WorkspacePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.workspaceRequest(this.props.match.params.workspaceSlug);
  }

  componentWillReceiveProps(nextProps) {
    const slug = this.props.match.params.workspaceSlug;
    const nextSlug = nextProps.match.params.workspaceSlug;
    if (slug !== nextSlug) {
      this.props.workspaceRequest(nextSlug);
    }
  }

  render() {
    return null;
  }
}

export default WorkspacePage;
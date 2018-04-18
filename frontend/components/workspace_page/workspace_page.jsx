import React from 'react';
import { Route, Redirect } from 'react-router-dom';

class WorkspacePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadWorkspacePage(this.props.match.params.workspaceSlug);
  }

  componentWillReceiveProps(nextProps) {
    const slug = this.props.match.params.workspaceSlug;
    const nextSlug = nextProps.match.params.workspaceSlug;
    if (slug !== nextSlug) {
      this.props.loadWorkspacePage(nextSlug);
    }
  }

  render() {
    return null;
  }
}

export default WorkspacePage;
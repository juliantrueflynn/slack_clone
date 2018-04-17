import React from 'react';
import { Route } from 'react-router';
import ChannelPageContainer from '../channel_page/channel_page_container';

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
    const { workspaceSlug } = this.props.match.params;
    
    return (
      <div>
        You're on workspace ID #{ workspaceSlug }
        <Route
          workspaceSlug={ workspaceSlug }
          path="/:workspaceSlug/:channelSlug"
          component={ ChannelPageContainer } />
      </div>
    );
  }
}

export default WorkspacePage;
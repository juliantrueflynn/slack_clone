import React from 'react';
import { Route, matchPath } from 'react-router';
import ChannelPageContainer from '../channel_page/channel_page_container';
import ChannelsMenuContainer from '../channels_menu/channels_menu_container';
import { isUrlForParentRoute } from '../../util/route_util';

class WorkspacePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { location: { pathname }, match: { url, params } } = this.props;
    if (isUrlForParentRoute(pathname, url)) {
      this.props.loadWorkspacePage(params.workspaceSlug);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { location: { pathname }, match: { url, params } } = this.props;
    const nextWorkspaceSlug = nextProps.match.params.workspaceSlug;
    if (isUrlForParentRoute(pathname, url) && url !== nextProps.match.url) {
      this.props.loadWorkspacePage(nextWorkspaceSlug);
    }
  }

  render() {
    const { workspaceSlug } = this.props.match.params;
    
    return (
      <div>
        <aside>
          <ChannelsMenuContainer />
        </aside>
        You're on workspace ID #{ workspaceSlug }
        <Route
          exact
          workspaceSlug={ workspaceSlug }
          path="/:workspaceSlug/:channelSlug"
          component={ ChannelPageContainer } />
      </div>
    );
  }
}

export default WorkspacePage;
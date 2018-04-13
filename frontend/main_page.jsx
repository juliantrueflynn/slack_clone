import React from 'react';
import { AuthRoute } from './util/route_util';
import { Switch, Link, Route } from 'react-router-dom';
import ChannelSessionFormContainer
  from './components/channel_session_form/channel_session_form_container';
import WorkspaceMenuContainer
  from './components/workspace_menu/workspace_menu_container';
import WorkspacePageContainer
  from './components/workspace_page/workspace_page_container';

const MainPage = () => (
  <div>
    <WorkspaceMenuContainer />
    <h2>Main Page</h2>
    <Switch>
      <Route exact path="/:workspaceSlug" component={ WorkspacePageContainer } />
      <AuthRoute path="/signin" component={ ChannelSessionFormContainer } />
      <AuthRoute path="/signup" component={ ChannelSessionFormContainer } />
    </Switch>
  </div>
);

export default MainPage;
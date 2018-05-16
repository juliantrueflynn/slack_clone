import React from 'react';
import { ChannelsActionCables } from './util/actionCableUtil';
import { AuthRoute, ProtectedRoute } from './util/routeUtil';
import { Switch, Link, Route } from 'react-router-dom';
import ChannelSessionFormContainer
  from './components/Session/SessionFormContainer';
import WorkspacePageContainer
  from './components/Workspace/WorkspacePageContainer';
import WorkspaceFormContainer from
  './components/Workspace/WorkspaceFormContainer';
import ChannelPageContainer from './components/Channel/ChannelPageContainer';
import './MainPage.css';

const MainPage = () => (
  <div className="main-page">
    <ChannelsActionCables />

    <Switch>
      <Route exact path="/" render={() =>
        <div className="content-container content-container__boxed-width">
          <h1>Slack Clone with Rails & React</h1>
          <p>More will go here later, stay-tuned!</p>
          <Link to="/create-workspace">Create New Workspace</Link>
        </div>
      } />
      <AuthRoute
        path="/signin"
        component={ChannelSessionFormContainer}
      />
      <AuthRoute
        path="/signup"
        component={ChannelSessionFormContainer}
      />
      <Route
        path="/create-workspace"
        component={WorkspaceFormContainer}
      />
      <ProtectedRoute
        path="/:workspaceSlug/:channelSlug"
        component={ChannelPageContainer}
      />
      <ProtectedRoute
        path="/:workspaceSlug"
        component={WorkspacePageContainer}
      />
    </Switch>
  </div>
);

export default MainPage;
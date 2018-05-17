import React from 'react';
import NavBarContainer from './components/NavBarContainer';
import MainPage from './MainPage';
import { ChannelsActionCables } from './util/actionCableUtil';
import { AuthRoute, ProtectedRoute } from './util/routeUtil';
import { Switch, Link, Route } from 'react-router-dom';
import SessionFormContainer from './components/Session/SessionFormContainer';
import WorkspacePageContainer
  from './components/Workspace/WorkspacePageContainer';
import WorkspaceFormContainer from
  './components/Workspace/WorkspaceFormContainer';
import ChannelPageContainer from './components/Channel/ChannelPageContainer';
import MessagePageContainer from './components/Message/MessagePageContainer';
import './App.css';
import 'sanitize.css';

const App = props => (
  <div className="app">
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
        component={SessionFormContainer}
      />
      <AuthRoute
        path="/signup"
        component={SessionFormContainer}
      />
      <Route
        path="/create-workspace"
        component={WorkspaceFormContainer}
      />
      <Route
        path="/:workspaceSlug/:channelSlug/thread/:messageSlug"
        component={MessagePageContainer}
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

    {props.children}
  </div>
);

export default App;
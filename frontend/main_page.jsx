import React from 'react';
import { ActionCableProvider } from 'react-actioncable-provider';
import { AuthRoute } from './util/route_util';
import { Switch, Link, Route } from 'react-router-dom';
import ChannelSessionFormContainer
  from './components/channel_session_form/channel_session_form_container';
import WorkspacePageContainer
  from './components/workspace_page/workspace_page_container';
import WorkspaceFormContainer from
  './components/workspace_form/workspace_form_container';
import ChannelPageContainer
  from './components/channel_page/channel_page_container';
import './main_page.css';

const MainPage = () => (
  <div className="main-page">
    <ActionCableProvider url="ws://localhost:3000/cable">
      <Switch>
        <Route exact path="/" render={ () =>
          <div className="content-container content-container__boxed-width">
            <h1>Slack Clone with Rails & React</h1>
            <p>More will go here later, stay-tuned!</p>
            <Link to="/create-workspace">Create New Workspace</Link>
          </div>
        } />
        <AuthRoute
          path="/signin"
          component={ ChannelSessionFormContainer } />
        <AuthRoute
          path="/signup"
          component={ ChannelSessionFormContainer } />
        <Route
          path="/create-workspace"
          component={ WorkspaceFormContainer } />
        <Route
          path="/:workspaceSlug/:channelSlug"
          component={ ChannelPageContainer } />
        <Route
          path="/:workspaceSlug"
          component={ WorkspacePageContainer } />
      </Switch>
    </ActionCableProvider>
  </div>
);

export default MainPage;
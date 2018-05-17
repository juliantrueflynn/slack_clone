import React, { Fragment } from 'react';
import { Route, Redirect, withRouter, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SessionFormContainer from '../components/Session/SessionFormContainer';
import WorkspacePageContainer
  from '../components/Workspace/WorkspacePageContainer';
import WorkspaceFormContainer from
  '../components/Workspace/WorkspaceFormContainer';
import ChannelPageContainer from '../components/Channel/ChannelPageContainer';
import PageMessageContainer from '../components/Views/PageMessageContainer';
import MessagePageContainer from '../components/Message/MessagePageContainer';
import NavBarContainer from '../components/NavBarContainer';

const Home = () => (
  <div>
    <NavBarContainer />
    <h1>Slack Clone</h1>
    I'm a temporary homepage!<br/>
    <Link to="/create-workspace">Create Workspace</Link>
  </div>
);

const routes = [
  {
    exact: true,
    path: '/',
    component: Home
  },
  {
    path: '/signin',
    component: SessionFormContainer
  },
  {
    path: '/signup',
    component: SessionFormContainer
  },
  {
    path: '/create-workspace',
    component: WorkspaceFormContainer
  },
  {
    path: '/:workspaceSlug',
    component: WorkspacePageContainer,
    routes: [
      {
        path: '/:workspaceSlug/:channelSlug',
        component: ChannelPageContainer,
        routes: [
          {
            path: '/:workspaceSlug/:channelSlug/thread/:messageSlug',
            component: ChannelPageContainer
          }
        ]
      }
    ]
  }
];

export const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props => (
      <route.component {...props} routes={route.routes} />
    )}
  />
);

const Auth = ({ component: Component, path, loggedIn }) => (
  <Route path={path} render={props => (
    loggedIn ? (<Redirect to="/" />) : (<Component {...props} />)
  )}/>
);

const Protected = ({ component: Component, path, loggedIn }) => (
  <Route path={path} render={props => (
    loggedIn ? (<Component {...props} />) : (<Redirect to="/signin" />)
  )} />
);

const mapStateToProps = state => ({
  loggedIn: Boolean(state.session.currentUser)
});

export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));
export const ProtectedRoute = withRouter(
  connect(mapStateToProps, null)(Protected)
);

export const PageRoutes = () => {console.log(routes);return (
  <Switch>
    {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
    {/* <Route exact path="/" render={() =>
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
      component={PageMessageContainer}
    />
    <ProtectedRoute
      path="/:workspaceSlug/:channelSlug"
      component={ChannelPageContainer}
    />
    <ProtectedRoute
      path="/:workspaceSlug"
      component={WorkspacePageContainer}
    /> */}
  </Switch>
)};
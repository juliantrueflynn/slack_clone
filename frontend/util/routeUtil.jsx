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
import PageHome from '../components/Views/PageHome';

const routes = [
  {
    path: '/',
    component: PageHome,
    exact: true
  },
  {
    path: '/signin',
    component: SessionFormContainer,
    exact: true
  },
  {
    path: '/signup',
    component: SessionFormContainer,
    exact: true
  },
  {
    path: '/create-workspace',
    component: WorkspaceFormContainer,
    exact: true
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

export const PageRoutes = () => (
  <Switch>
    {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
  </Switch>
);
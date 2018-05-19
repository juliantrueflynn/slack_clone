import React, { Fragment } from 'react';
import { Route, Redirect, withRouter, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SessionFormContainer from '../components/Session/SessionFormContainer';
import WorkspacePageContainer
  from '../components/Workspace/WorkspacePageContainer';
import WorkspaceFormContainer from
  '../components/Workspace/WorkspaceFormContainer';
import ChannelPageContainer from '../components/Channel/ChannelPageContainer';
import PageHome from '../components/Views/PageHome';
import ChannelRightSidebarContainer
  from '../components/Channel/ChannelRightSidebarContainer';

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
            component: ChannelRightSidebarContainer
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
    {routes.map((route, i) => (
      <RouteWithSubRoutes key={`pageRoute${i}`} {...route} />
    ))}
  </Switch>
);
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter, Switch } from 'react-router-dom';
import SessionFormContainer from '../components/Session/SessionFormContainer';
import WorkspacePageContainer from '../components/Workspace/WorkspacePageContainer';
import WorkspaceFormContainer from '../components/Workspace/WorkspaceFormContainer';
import ChannelPageContainer from '../components/Channel/ChannelPageContainer';
import PageHome from '../components/Views/PageHome';
import MessageThreadContainer from '../components/Message/MessageThreadContainer';
import UserFavoritesContainer from '../components/Views/UserFavoritesContainer';
import UserViewContainer from '../components/UserViewContainer';
import ThreadsPageContainer from '../components/ThreadsPageContainer';

const routes = [
  {
    path: '/',
    component: PageHome,
    exact: true,
  },
  {
    path: '/signin',
    component: SessionFormContainer,
    exact: true,
    isAuth: true,
  },
  {
    path: '/signup',
    component: SessionFormContainer,
    exact: true,
    isAuth: true,
  },
  {
    path: '/create-workspace',
    component: WorkspaceFormContainer,
    exact: true,
    isProtected: true,
  },
  {
    path: '/:workspaceSlug',
    component: WorkspacePageContainer,
    isProtected: true,
    exact: true,
  },
  {
    path: '/:workspaceSlug/threads',
    component: ThreadsPageContainer,
    exact: true,
  },
  {
    path: '/:workspaceSlug/:channelSlug',
    component: ChannelPageContainer,
    isProtected: true,
    routes: [
      {
        path: '/:workspaceSlug/:channelSlug/favorites',
        component: UserFavoritesContainer,
      },
      {
        path: '/:workspaceSlug/:channelSlug/team/:userSlug',
        component: UserViewContainer,
      },
      {
        path: '/:workspaceSlug/:channelSlug/thread/:messageSlug',
        component: MessageThreadContainer,
      }
    ]
  }
];

export const RouteSubRoutes = (route) => {
  if (route.isAuth && route.loggedIn) {
    return (<Redirect to="/" />);
  }

  if (route.isProtected && !route.loggedIn) {
    return (<Redirect to="/signin" />);
  }

  return (
    <Route
      path={route.path}
      render={props => (
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
};

export const PageRoutes = () => (
  <Switch>
    {routes.map(route => (
      <RouteWithSubRoutes key={route.path} {...route} />
    ))}
  </Switch>
);

const mapStateToProps = state => ({
  loggedIn: Boolean(state.session.currentUser)
});

export const RouteWithSubRoutes = withRouter(connect(mapStateToProps, null)(RouteSubRoutes));

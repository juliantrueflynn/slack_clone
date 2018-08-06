import React from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Redirect,
  withRouter,
  Switch
} from 'react-router-dom';
import PageHome from '../components/PageHome';
import SessionForm from '../components/SessionForm';
import WorkspacePageContainer from '../components/Workspace/WorkspacePageContainer';
import PageWorkspaceCreate from '../components/PageWorkspaceCreate';
import ChannelPageContainer from '../components/Channel/ChannelPageContainer';
import MessageThreadContainer from '../components/Message/MessageThreadContainer';
import UserFavoritesContainer from '../components/Views/UserFavoritesContainer';
import UserViewContainer from '../components/UserViewContainer';
import ThreadsPageContainer from '../components/ThreadsPageContainer';
import AllUnreadsPageContainer from '../components/AllUnreadsPageContainer';

export const routesConfig = [
  {
    path: '/',
    component: PageHome,
    exact: true,
  },
  {
    path: '/signin',
    component: SessionForm,
    exact: true,
    isAuth: true,
  },
  {
    path: '/signup',
    component: SessionForm,
    exact: true,
    isAuth: true,
  },
  {
    path: '/create-workspace',
    component: PageWorkspaceCreate,
    exact: true,
    isProtected: true,
  },
  {
    path: '/:workspaceSlug',
    component: WorkspacePageContainer,
    isProtected: true,
    routes: [
      {
        path: '/:workspaceSlug/threads',
        component: ThreadsPageContainer,
      },
      {
        path: '/:workspaceSlug/unreads',
        component: AllUnreadsPageContainer,
      },
      {
        path: '/:workspaceSlug/:channelSlug',
        component: ChannelPageContainer,
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
    ]
  },
];

const mapStateToProps = state => ({
  isLoggedIn: !!state.session.currentUser
});

const RouteSubRoutes = (route) => {
  if (route.isAuth && route.isLoggedIn) {
    return (<Redirect to="/" />);
  }

  if (route.isProtected && !route.isLoggedIn) {
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

const RouteWithSubRoutes = withRouter(connect(mapStateToProps, null)(RouteSubRoutes));

export const PageRoutes = ({ routes, ...extraProps }) => (
  <Switch>
    {routes.map(route => (
      <RouteWithSubRoutes key={route.path} {...extraProps} {...route} />
    ))}
  </Switch>
);

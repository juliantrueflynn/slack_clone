import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import PageHome from '../components/PageHome';
import SessionForm from '../components/SessionForm';
import WorkspaceContainer from '../components/WorkspaceContainer';
import ChatPageContainer from '../components/ChatPageContainer';
import FavoritesDrawer from '../components/FavoritesDrawer';
import UserProfileDrawer from '../components/UserProfileDrawer';
import MessageThreadDrawer from '../components/MessageThreadDrawer';

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
    path: '/:workspaceSlug',
    component: WorkspaceContainer,
    isProtected: true,
    routes: [
      {
        path: '/:workspaceSlug/(messages)?/:chatPath',
        component: ChatPageContainer,
        routes: [
          {
            path: '/:workspaceSlug/(.*)/favorites',
            component: FavoritesDrawer,
          },
          {
            path: '/:workspaceSlug/(.*)/team/:userSlug',
            component: UserProfileDrawer,
          },
          {
            path: '/:workspaceSlug/(.*)/thread/:messageSlug',
            component: MessageThreadDrawer,
          }
        ]
      },
    ]
  },
];

const mapStateToProps = state => ({
  isLoggedIn: !!state.session.currentUser
});

const RouteSubRoutes = (route) => {
  if (route.isAuth && route.isLoggedIn) {
    return <Redirect to="/" />;
  }

  if (route.isProtected && !route.isLoggedIn) {
    return <Redirect to="/signin" />;
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

export const RouteWithSubRoutes = withRouter(connect(mapStateToProps, null)(RouteSubRoutes));

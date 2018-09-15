import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import PageHome from '../components/PageHome';
import SessionForm from '../components/SessionForm';
import WorkspacePageContainer from '../components/WorkspacePageContainer';
import MessageThreadContainer from '../components/MessageThreadContainer';
import UserFavoritesContainer from '../components/UserFavoritesContainer';
import UserViewContainer from '../components/UserViewContainer';
import ChatPageContainer from '../components/ChatPageContainer';

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
    component: WorkspacePageContainer,
    isProtected: true,
    routes: [
      {
        path: '/:workspaceSlug/(messages)?/:chatPath',
        component: ChatPageContainer,
        routes: [
          {
            path: '/:workspaceSlug/(.*)/favorites',
            component: UserFavoritesContainer,
          },
          {
            path: '/:workspaceSlug/(.*)/team/:userSlug',
            component: UserViewContainer,
          },
          {
            path: '/:workspaceSlug/(.*)/thread/:messageSlug',
            component: MessageThreadContainer,
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

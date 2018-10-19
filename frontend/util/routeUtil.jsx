import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import PageHome from '../components/PageHome';
import SessionForm from '../components/SessionForm';
import WorkspaceContainer from '../components/WorkspaceContainer';
import ChatPageSwitchContainer from '../components/ChatPageSwitchContainer';
import DrawerSwitchContainer from '../components/DrawerSwitchContainer';

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
        path: '/:workspaceSlug/(messages)*/:chatPath',
        component: ChatPageSwitchContainer,
        routes: [
          {
            path: '/:workspaceSlug/(messages)+/:chatPath/:drawerType/:drawerSlug?',
            component: DrawerSwitchContainer,
          },
          {
            path: '/:workspaceSlug/(unreads|threads)/:drawerType/:drawerSlug?',
            component: DrawerSwitchContainer,
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

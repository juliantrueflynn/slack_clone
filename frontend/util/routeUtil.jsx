import React from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Redirect,
  Switch,
  withRouter,
} from 'react-router-dom';
import PublicViewHome from '../components/PublicViewHome';
import SessionForm from '../components/SessionForm';
import WorkspaceContainer from '../containers/WorkspaceContainer';
import ChatroomSwitchContainer from '../containers/ChatroomSwitchContainer';
import DrawerSwitchContainer from '../containers/DrawerSwitchContainer';

export const routesConfig = [
  {
    path: '/',
    component: PublicViewHome,
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
        component: ChatroomSwitchContainer,
        routes: [
          {
            path: '/:workspaceSlug/(threads|unreads|messages/[A-Za-z0-9]{24})/:drawerType/:drawerSlug?',
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

const RouteWithSubRoutes = withRouter(connect(mapStateToProps, null)(RouteSubRoutes));

export const PageRoutes = ({ routes }) => (
  <Switch>
    {routes && routes.map(route => <RouteWithSubRoutes key={route.path} {...route} />)}
  </Switch>
);

import React from 'react';
import classNames from 'classnames';
import { Switch } from 'react-router-dom';
import { RouteWithSubRoutes } from '../util/routeUtil';
import './Layout.css';

const Layout = ({
  routes,
  layoutFor,
  isLoading,
  hasBodyWrapper,
  children,
}) => {
  const layoutClassNames = classNames('Layout', {
    [`Layout__${layoutFor}`]: layoutFor,
    [`Layout__${layoutFor}--loading`]: layoutFor && isLoading,
    'Layout--loading': !layoutFor && isLoading,
  });

  let childComp = children;
  if (hasBodyWrapper) {
    childComp = (
      <div className="Layout__body">
        {children}
      </div>
    );
  }

  return (
    <div className={layoutClassNames}>
      {childComp}
      {routes && (
        <Switch>
          {routes.map(route => <RouteWithSubRoutes key={route.path} {...route} />)}
        </Switch>
      )}
    </div>
  );
};

export default Layout;

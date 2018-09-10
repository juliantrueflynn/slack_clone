import React from 'react';
import { Switch } from 'react-router-dom';
import { RouteWithSubRoutes } from '../util/routeUtil';

const ChatSwitch = ({ routes }) => (
  <Switch>
    {routes.map(route => (
      <RouteWithSubRoutes key={route.path || route.key} {...route} />
    ))}
  </Switch>
);

export default ChatSwitch;

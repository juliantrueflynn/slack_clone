import React from 'react';
import { Switch } from 'react-router-dom';
import ChannelHeaderContainer from './ChannelHeaderContainer';
import { RouteWithSubRoutes } from '../util/routeUtil';
import './ChatPage.css';

const ChatPage = ({ classNames, routes, children }) => (
  <div className={classNames}>
    <ChannelHeaderContainer />
    <div className="ChatPage__row">
      <div className="ChatPage__container">
        {children}
      </div>
      {routes && (
        <Switch>
          {routes.map(route => <RouteWithSubRoutes key={route.path} {...route} />)}
        </Switch>
      )}
    </div>
  </div>
);

export default ChatPage;

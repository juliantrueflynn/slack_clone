import React from 'react';
import ChannelHeaderContainer from './ChannelHeaderContainer';
import './ChatPage.css';

const ChatPage = ({ classNames, childRoutes, children }) => (
  <div className={classNames}>
    <ChannelHeaderContainer />
    <div className="ChatPage__row">
      <div className="ChatPage__container">
        {children}
      </div>
      {childRoutes}
    </div>
  </div>
);

export default ChatPage;

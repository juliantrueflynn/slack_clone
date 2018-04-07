import React from 'react';
import { AuthRoute } from './util/route_util';
import { Route } from 'react-router-dom';
import ChannelSessionFormContainer
  from './components/channel_session_form/channel_session_form_container';


const MainPage = () => (
  <div>
    <h2>Main Page</h2>
    <AuthRoute path="/signin" component={ ChannelSessionFormContainer } />
    <AuthRoute path="/signup" component={ ChannelSessionFormContainer } />
  </div>
);

export default MainPage;
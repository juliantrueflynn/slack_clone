import React from 'react';
import NavBarContainer from '../Layout/NavBarContainer';
import { Link } from 'react-router-dom';

const PageHome = () => (
  <div className="page page__home">
    <NavBarContainer />
    <h1>Slack Clone</h1>
    I'm a temporary homepage!<br/>
    
    <Link to="/create-workspace">Create Workspace</Link>
  </div>
);

export default PageHome;
import React from 'react';
import Button from './Button';
import withPublicView from './withPublicView';
import PublicWorkspacesContainer from './PublicWorkspacesContainer';
import './PageHome.css';

const PageHome = ({ workspaces, isLoggedIn }) => (
  <div className="PageHome">
    <div className="Page__body">
      <div className="PageHome__hero">
        <h1 className="PageHome__hero-title">
          Slack Clone
          <br />
          made with React & Rails
        </h1>
        <Button buttonFor="hero" color="green" size="lg" style={{ textTransform: 'none' }}>
          Contact Julian Flynn
        </Button>
      </div>
      <div className="Page__container">
        <PublicWorkspacesContainer
          isLoggedIn={isLoggedIn}
          workspaces={workspaces}
        />
      </div>
    </div>
  </div>

);

export default withPublicView(PageHome);

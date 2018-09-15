import React from 'react';
import withPublicView from './withPublicView';
import PublicWorkspacesContainer from './PublicWorkspacesContainer';
import './PageHome.css';

const PageHome = ({ workspaces, isLoggedIn, currentUser }) => (
  <div className="PageHome">
    <div className="Page__body">
      <div className="PageHome__hero">
        <h1 className="PageHome__hero-title">
          Slack Clone
          <br />
          made with React & Rails
        </h1>
        <a
          href="https://github.com/juliantrueflynn/slack_clone"
          className="Btn Btn__styled Btn__lg Btn__hero Btn__green"
          rel="noopener noreferrer"
          target="_blank"
          title="Slack Clone GitHub"
        >
          View GitHub Repo
        </a>
      </div>
      <div className="Page__container">
        <PublicWorkspacesContainer
          isLoggedIn={isLoggedIn}
          workspaces={workspaces}
          currentUser={currentUser}
        />
      </div>
    </div>
  </div>

);

export default withPublicView(PageHome);

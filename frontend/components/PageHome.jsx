import React from 'react';
import withPublicView from './withPublicView';
import PublicWorkspaces from './PublicWorkspaces';
import './PageHome.css';

const PageHome = ({
  content: { workspaces, openWorkspaceModal },
  isLoggedIn,
  currentUser,
  createWorkspaceSubRequest,
  updateWorkspaceSubRequest,
}) => (
  <div className="PageHome PageView__body">
    <div className="PageHome__hero">
      <div className="PageHome__hero-content">
        <h1 className="PageHome__hero-title">
          <span className="PageHome__app-name">Slack Clone</span>
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
    </div>
    <div className="PageHome__description">
      <div className="PublicView__container">
        <PublicWorkspaces
          isLoggedIn={isLoggedIn}
          workspaces={workspaces}
          currentUser={currentUser}
          openWorkspaceModal={openWorkspaceModal}
          createWorkspaceSubRequest={createWorkspaceSubRequest}
          updateWorkspaceSubRequest={updateWorkspaceSubRequest}
        />
      </div>
    </div>
  </div>
);

export default withPublicView(PageHome);

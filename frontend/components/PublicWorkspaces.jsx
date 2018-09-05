import React from 'react';
import { Link } from 'react-router-dom';
import PublicWorkspacesItem from './PublicWorkspacesItem';
import './PublicWorkspaces.css';

const PublicWorkspaces = ({
  workspaces,
  isLoggedIn,
  createWorkspaceSubRequest,
  deleteWorkspaceSubRequest,
}) => {
  if (!workspaces || !isLoggedIn) return null;

  return (
    <section className="PublicWorkspaces">
      <header className="PublicWorkspaces__header">
        <h2 className="PublicWorkspaces__title">
          Select a Workspace
        </h2>
        <div className="PublicWorkspaces__subtitle">
          You can also&nbsp;
          <Link to="/create-workspace" className="PublicWorkspaces__create-workspace">
            create a workspace
          </Link>
        </div>
      </header>
      <div className="PublicWorkspaces__list" role="list">
        {workspaces.map(workspace => (
          <PublicWorkspacesItem
            key={workspace.id}
            createWorkspaceSubRequest={createWorkspaceSubRequest}
            deleteWorkspaceSubRequest={deleteWorkspaceSubRequest}
            workspace={workspace}
          />
        ))}
      </div>
    </section>
  );
};

export default PublicWorkspaces;

import React from 'react';
import Button from './Button';
import withPublicView from './withPublicView';
import './PageHome.css';

const PageHome = ({ workspaces }) => (
  <div className="home">
    <div className="Page__body">
      <div className="hero hero__home">
        Created by Julian Flynn
        <Button buttonFor="hero" color="purple">
          Contact
        </Button>
      </div>

      <div className="Page__container">
        <Button linkTo="/create-workspace" buttonFor="create">
          Create Workspace
        </Button>

        <section className="home__workspaces">
          <h2>
            Public Workspaces
          </h2>
          <div className="public-rooms">
            {workspaces && workspaces.map(workspace => (
              <li key={workspace.id} className="room-item">
                <div className="room-item__body">
                  {workspace.title}
                </div>
              </li>
            ))}
          </div>
        </section>
      </div>
    </div>
  </div>
);

export default withPublicView(PageHome);

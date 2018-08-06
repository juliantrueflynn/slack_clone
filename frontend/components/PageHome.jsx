import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import withPublicView from './withPublicView';
import './PageHome.css';

const PageHome = ({ workspaces }) => (
  <div className="home">
    <div className="Page__body">
      <div className="hero hero__home">
        Created by Julian Flynn
        <Button className="Btn__hero">
          Contact
        </Button>
      </div>

      <div className="Page__container">
        <Link role="button" className="Btn Btn__create" to="/create-workspace">
          Create Workspace
        </Link>

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

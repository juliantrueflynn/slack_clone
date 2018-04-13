import React from 'react';
import { withRouter, Link } from 'react-router-dom';

class WorkspaceMenuItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { workspace } = this.props;
    return (
      <li>
        <Link to={ `/${workspace.id}` }>
          <div>
            <span>{ workspace.id } - { workspace.title }</span>
          </div>
          /{ workspace.slug }
        </Link>
      </li>
    );
  }
}

export default WorkspaceMenuItem;
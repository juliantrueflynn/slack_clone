import React from 'react';
import { NavLink } from 'react-router-dom';

class WorkspaceMenuItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { workspace: { id, title, slug } } = this.props;
  
    return (
      <li>
        <NavLink to={ `/${ slug }` }>
          { id } - { title } - { slug }
        </NavLink>
      </li>
    );
  }
}

export default WorkspaceMenuItem;
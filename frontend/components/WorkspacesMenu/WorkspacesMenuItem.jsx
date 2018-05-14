import React from 'react';
import { NavLink } from 'react-router-dom';

class WorkspacesMenuItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { workspace: { id, title, slug } } = this.props;
  
    return (
      <li className="menu-item menu-item__workspace">
        <NavLink to={`/${slug}`}>
          {id} - {title} - {slug}
        </NavLink>
      </li>
    );
  }
}

export default WorkspacesMenuItem;
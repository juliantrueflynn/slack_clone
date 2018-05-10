import React from 'react';
import { Link } from 'react-router-dom';

class WorkspaceMenuItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { workspace: { id, title, slug } } = this.props;
  
    return (
      <li>
        <Link to={ `/${ slug }` }>
          { id } - { title } - { slug }
        </Link>
      </li>
    );
  }
}

export default WorkspaceMenuItem;
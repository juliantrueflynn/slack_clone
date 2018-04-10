import React from 'react';

class WorkspaceMenuItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { workspace } = this.props;
    return (
      <li>
        <div>
          <span>{ workspace.title }</span>
        </div>
        /{ workspace.slug } 
      </li>
    );
  }
}

export default WorkspaceMenuItem;
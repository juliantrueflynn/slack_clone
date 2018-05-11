import React from 'react';
import { NavLink } from 'react-router-dom';

class ChannelsMenuItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { channel: { id, title, slug }, workspaceSlug } = this.props;

    return (
      <li>
        <NavLink exact to={ `/${ workspaceSlug }/${ slug }` }>
          ID: #{ id } - Title: { title }
        </NavLink>
      </li>
    );
  }
}

export default ChannelsMenuItem;
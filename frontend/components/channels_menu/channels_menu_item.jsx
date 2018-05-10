import React from 'react';
import { Link } from 'react-router-dom';

class ChannelsMenuItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { channel, workspaceSlug } = this.props;
    
    return (
      <li>
        <Link to={ `/${ workspaceSlug }/${ channel.slug }` }>
          ID: #{ channel.id } - Title: { channel.title }
        </Link>
      </li>
    );
  }
}

export default ChannelsMenuItem;
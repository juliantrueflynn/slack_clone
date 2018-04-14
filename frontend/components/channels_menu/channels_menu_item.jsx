import React from 'react';
import { Link } from 'react-router-dom';

class ChannelsMenuItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { channel, workspaceId } = this.props;
    return (
      <li>
        <Link to={ `/${workspaceId}/${channel.id}` }>
          ID: #{ channel.id } - Title: { channel.title }
        </Link>
      </li>
    );
  }
}

export default ChannelsMenuItem;
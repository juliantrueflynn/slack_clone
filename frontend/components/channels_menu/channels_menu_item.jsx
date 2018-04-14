import React from 'react';

class ChannelsMenuItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { channel } = this.props;
    
    return (
      <li>ID: #{ channel.id } - Title: { channel.title }</li>
    );
  }
}

export default ChannelsMenuItem;
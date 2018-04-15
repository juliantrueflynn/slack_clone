import React from 'react';

class MessageEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { message } = this.props;

    return (
      <div>{ message.body }</div>
    );
  }
}

export default MessageEntry;
import React from 'react';

class ThreadEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { thread } = this.props;
    
    return (
      <div>{ thread.id } - { thread.authorId } - { thread.body }</div>
    );
  }
}

export default ThreadEntry;
import React from 'react';

class ThreadEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { thread } = this.props;
    return (
      <li key={ thread.id }>{ thread.body }</li>
    );
  }
}

export default ThreadEntry;
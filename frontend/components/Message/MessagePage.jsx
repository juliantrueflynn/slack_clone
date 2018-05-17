import React from 'react';

class MessagePage extends React.Component {
  componentDidMount() {
    const sidebarProps = { messageSlug: this.props.messageSlug };
    this.props.openRightSidebar(sidebarProps);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.messageSlug !== nextProps.messageSlug) {
      const sidebarProps = { messageSlug: nextProps.messageSlug };
      this.props.openRightSidebar(sidebarProps);
    }
  }

  render() {
    return null;
  }
}

export default MessagePage;
import React from 'react';

class ChannelRightSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.handleCloseSidebar = this.handleCloseSidebar.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.isOpen !== nextProps.isRightSidebarOpen) {
      return {
        isOpen: nextProps.isRightSidebarOpen
      };
    }

    return null;
  }

  handleCloseSidebar() {
    this.props.closeThread(this.props.thread.id);
  }

  render() {
    if (!this.state.isOpen) return null;
  
    return (
      <aside>
        <header>
          <span className="h4">Thread</span>
          <button onClick={ this.handleCloseSidebar }>X</button>
        </header>
        <div>{ this.props.thread.authorId }</div>
        <div>{ this.props.thread.body }</div>
      </aside>
    );
  }
}

export default ChannelRightSidebar;
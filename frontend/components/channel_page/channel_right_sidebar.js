import React from 'react';
import ThreadForm from './thread_form';
import ThreadEntry from './thread_entry';

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
    this.props.closeThread();
  }

  render() {
    const { thread, createMessage, threadEntries } = this.props;

    if (!this.state.isOpen) return null;
  
    return (
      <aside>
        <header>
          <span className="h4">Thread</span>
          <button onClick={ this.handleCloseSidebar }>X</button>
        </header>
        <div>{ thread.authorId }</div>
        <div>{ thread.body }</div>
        <ul>
          { threadEntries.map(entry =>
            <ThreadEntry key={ entry.id } thread={ entry } />
          )}
        </ul>
        <ThreadForm createMessage={ createMessage } thread={ thread } />
      </aside>
    );
  }
}

export default ChannelRightSidebar;
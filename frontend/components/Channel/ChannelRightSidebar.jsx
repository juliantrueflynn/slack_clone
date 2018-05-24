import React from 'react';
import MessageThread from '../Message/MessageThread';
import ChannelPageContainer from './ChannelPageContainer';
import ChannelPage from './ChannelPage';
import { camelize } from 'humps';

class ChannelRightSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.handleCloseSidebar = this.handleCloseSidebar.bind(this);
  }

  handleCloseSidebar() {
    const { match: { params } } = this.props;
    this.props.closeRightSidebar();
    this.props.navigate(`/${params.workspaceSlug}/${params.channelSlug}`);
  }

  render() {
    const { isRightSidebarOpen, sidebarTitle } = this.props;
    const camelizedTitle = camelize(sidebarTitle);

    if (!isRightSidebarOpen) {
      return null;
    }

    return (
      <aside
        className={`sidebar__channel-right sidebar__${camelizedTitle}`}
      >
        <header className="sidebar__header">
          <h4>{sidebarTitle}</h4>
          <button onClick={this.handleCloseSidebar}>&#10006;</button>
        </header>
        
        {this.props.children}
      </aside>
    );
  }
}

export default ChannelRightSidebar;
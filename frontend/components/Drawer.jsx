import React from 'react';
import Button from './Button';
import './Drawer.css';

class RightSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    const {
      openDrawer,
      drawer,
      fetchEntitiesRequest,
    } = this.props;

    if (!drawer.drawerType) {
      openDrawer(this.drawerType());
    }

    fetchEntitiesRequest();
  }

  drawerType() {
    const { match: { params } } = this.props;
    const drawerProps = { drawerType: 'favorites' };

    if (params.messageSlug) {
      drawerProps.drawerType = 'thread';
      drawerProps.drawerSlug = params.messageSlug;
    }

    if (params.userSlug) {
      drawerProps.drawerType = 'team';
      drawerProps.drawerSlug = params.userSlug;
    }

    return drawerProps;
  }

  handleClose() {
    const {
      closeDrawer,
      history,
      match: { params: { 0: chatPath, workspaceSlug } },
    } = this.props;

    closeDrawer();
    history.push(`/${workspaceSlug}/${chatPath}`);
  }

  render() {
    const { drawerTitle, render } = this.props;

    return (
      <aside className="RightSidebar">
        <header className="RightSidebar__header">
          <div className="RightSidebar__headings">
            {drawerTitle && (
              <h4 className="RightSidebar__title">
                {drawerTitle}
              </h4>
            )}
          </div>

          <Button unStyled buttonFor="close" onClick={this.handleClose}>
            &#10006;
          </Button>
        </header>

        <div className="RightSidebar__body">
          {render()}
        </div>
      </aside>
    );
  }
}

export default RightSidebar;

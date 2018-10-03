import React from 'react';
import Button from './Button';
import './Drawer.css';

class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    const {
      openDrawer,
      fetchEntitiesRequest,
    } = this.props;

    openDrawer(this.drawerProps());
    fetchEntitiesRequest();
  }

  componentDidUpdate(prevProps) {
    const {
      openDrawer,
      fetchEntitiesRequest,
      location: { pathname },
    } = this.props;
    const { drawerSlug: prevDrawerSlug } = prevProps.drawer;
    const { drawerType, drawerSlug } = this.drawerProps();

    if (pathname !== prevProps.location.pathname) {
      openDrawer({ drawerType, drawerSlug });

      if (drawerSlug !== prevDrawerSlug) {
        fetchEntitiesRequest();
      }
    }
  }

  drawerProps() {
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
    const { drawerTitle, render, isLoading } = this.props;
    const { drawerType } = this.drawerProps();

    let classNames = 'Drawer';
    if (drawerType) classNames += ` Drawer__${drawerType}`;
    if (isLoading) classNames += ' Drawer__loading';

    return (
      <aside className={classNames}>
        <header className="Drawer__header">
          <div className="Drawer__headings">
            {drawerTitle && (
              <h4 className="Drawer__title">
                {drawerTitle}
              </h4>
            )}
          </div>

          <Button unStyled buttonFor="close" onClick={this.handleClose}>
            &#10006;
          </Button>
        </header>

        <div className="Drawer__body">
          {render()}
        </div>
      </aside>
    );
  }
}

export default Drawer;

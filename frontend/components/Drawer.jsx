import React from 'react';
import classNames from 'classnames';
import Button from './Button';
import './Drawer.css';
import Scrollable from './Scrollable';

const Drawer = ({
  drawerType,
  closeDrawer,
  channel,
  messages,
  isLoading,
  children,
}) => {
  const drawerClassNames = classNames('Drawer', {
    [`Drawer__${drawerType}`]: drawerType,
  });

  const close = () => closeDrawer();

  const title = () => {
    switch (drawerType) {
      case 'favorites':
        return 'Starred items';
      case 'convo':
        return 'Thread';
      case 'team':
        return 'Workspace directory';
      case 'details': {
        if (!channel) {
          return null;
        }

        if (channel.hasDm) {
          return 'About this conversation';
        }

        return `About #${channel.title}`;
      }
      default:
        return null;
    }
  };

  const isConvoDrawer = drawerType === 'convo';
  const convoMessages = isConvoDrawer && !isLoading ? messages : null;

  return (
    <div className={drawerClassNames}>
      <header className="Drawer__header">
        <div className="Drawer__headings">
          {title()}
        </div>
        <Button unStyled buttonFor="close" onClick={close}>
          &#10006;
        </Button>
      </header>
      <div className="Drawer__body">
        <Scrollable messages={convoMessages} isAutoScroll={isConvoDrawer}>
          {children}
        </Scrollable>
      </div>
    </div>
  );
};

export default Drawer;

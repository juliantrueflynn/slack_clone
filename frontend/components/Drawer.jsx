import React from 'react';
import ScrollBar from './ScrollBar';
import Button from './Button';
import './Drawer.css';

const Drawer = ({
  isLoading,
  drawerType,
  closeDrawer,
  channel,
  messages,
  currentUserSlug,
  children,
}) => {
  const isConvo = drawerType === 'convo';
  const close = () => closeDrawer();

  let title;
  switch (drawerType) {
    case 'favorites':
      title = 'Starred items';
      break;
    case 'convo':
      title = 'Thread';
      break;
    case 'team':
      title = 'Workspace directory';
      break;
    case 'details': {
      if (channel && !channel.hasDm) {
        title = `About #${channel.title}`;
      }

      if (channel && channel.hasDm) {
        title = 'About this conversation';
      }

      break;
    }
    default: break;
  }

  const drawerClassNames = `Drawer Drawer__${drawerType}`;
  const lastMessage = isConvo ? messages[messages.length - 1] : null;

  return (
    <div className={drawerClassNames}>
      <header className="Drawer__header">
        <div className="Drawer__headings">
          {title}
        </div>
        <Button unStyled buttonFor="close" onClick={close}>
          &#10006;
        </Button>
      </header>
      <div className="Drawer__container">
        <div className="Drawer__body">
          {isConvo && !isLoading && (
            <ScrollBar
              lastMessage={lastMessage}
              currentUserSlug={currentUserSlug}
              shouldAutoScroll
            >
              {children}
            </ScrollBar>
          )}
          {isConvo || (
            <ScrollBar>
              {children}
            </ScrollBar>
          )}
        </div>
      </div>
    </div>
  );
};

export default Drawer;

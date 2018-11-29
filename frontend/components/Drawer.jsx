import React from 'react';
import ScrollBar from './ScrollBar';
import Button from './Button';
import './Drawer.css';

const Drawer = ({
  isLoading,
  drawerType,
  closeDrawer,
  drawerTitle,
  messages,
  currentUserSlug,
  children,
}) => {
  const isConvo = drawerType === 'convo';
  const lastMessage = isConvo ? messages[messages.length - 1] : null;
  const drawerClassNames = `Drawer Drawer__${drawerType}`;

  return (
    <div className={drawerClassNames}>
      <header className="Drawer__header">
        <h3 className="Drawer__header-title">
          {drawerTitle}
        </h3>
        <Button unStyled buttonFor="close" onClick={closeDrawer}>
          <span role="img" aria-label="Close drawer">&times;</span>
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

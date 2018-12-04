import React from 'react';
import ScrollBar from './ScrollBar';
import Button from './Button';
import Modal from './Modal';
import './Drawer.css';

const Drawer = ({
  isLoading,
  drawerType,
  closeDrawer,
  drawerTitle,
  messages,
  currentUserSlug,
  isModalOpen,
  children,
}) => {
  const isConvo = drawerType === 'convo';
  const lastMsg = isConvo ? messages[messages.length - 1] : null;
  const drawerClassNames = `Drawer Drawer__${drawerType}`;

  if (isModalOpen) {
    return (
      <Modal
        modalFor="drawer"
        modalTitle={drawerTitle}
        close={closeDrawer}
        isOpen
      >
        <div className={drawerClassNames}>{children({ messages })}</div>
      </Modal>
    );
  }

  return (
    <div className={drawerClassNames}>
      <header className="Drawer__header">
        <h3 className="Drawer__header-title">{drawerTitle}</h3>
        <Button unStyled buttonFor="close" onClick={closeDrawer}>
          <span role="img" aria-label="Close drawer">&times;</span>
        </Button>
      </header>
      <div className="Drawer__container">
        <div className="Drawer__body">
          {isConvo && !isLoading && (
            <ScrollBar lastMessage={lastMsg} currentUserSlug={currentUserSlug} shouldAutoScroll>
              {children({ messages })}
            </ScrollBar>
          )}
          {isConvo || <ScrollBar>{children({ messages })}</ScrollBar>}
        </div>
      </div>
    </div>
  );
};

export default Drawer;

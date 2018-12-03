import React from 'react';
import ScrollBar from './ScrollBar';
import Button from './Button';
import Modal from './Modal';
import './Drawer.css';
import withDetectMobileView from './withDetectMobileView';

const Drawer = ({
  isLoading,
  drawerType,
  closeDrawer,
  drawerTitle,
  messages,
  currentUserSlug,
  isMobileSize,
  modalType,
  modalClose,
  children,
}) => {
  const isConvo = drawerType === 'convo';
  const lastMsg = isConvo ? messages[messages.length - 1] : null;
  const drawerClassNames = `Drawer Drawer__${drawerType}`;

  if (isMobileSize) {
    const isModalOpen = modalType === 'MODAL_DRAWER_MOBILE';

    return (
      <Modal
        modalFor="drawer"
        modalTitle={drawerTitle}
        close={modalClose}
        isOpen={isModalOpen}
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

export default withDetectMobileView(Drawer);

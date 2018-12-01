import React from 'react';
import Drawer from '../components/Drawer';

const DrawerMapByType = ({
  path,
  isLoading,
  drawerTitle,
  closeDrawer,
  messages,
  currentUserSlug,
  component: Component,
  ...props
}) => {
  return (
    <Drawer
      isLoading={isLoading}
      drawerType={path}
      drawerTitle={drawerTitle}
      closeDrawer={closeDrawer}
      messages={messages}
      currentUserSlug={currentUserSlug}
      children={drawerProps => (
        <Component {...props} {...drawerProps} />
      )}
    />
  );
};

export default DrawerMapByType;

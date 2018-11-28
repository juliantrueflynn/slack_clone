import React from 'react';
import classNames from 'classnames';
import Menu from './Menu';
import './SidebarMenu.css';

const SidebarMenu = ({
  menuFor,
  widgetTitle,
  menuItems,
  children,
}) => {
  const widgetClassNames = classNames('SidebarMenu', {
    [`SidebarMenu__${menuFor}`]: menuFor,
  });

  const title = widgetTitle || children;

  return (
    <div className={widgetClassNames}>
      {title && (
        <header className="SidebarMenu__header">
          <div className="SidebarMenu__title">
            {title}
          </div>
        </header>
      )}
      {menuItems && <Menu menuFor={menuFor} items={menuItems} />}
    </div>
  );
};

export default SidebarMenu;

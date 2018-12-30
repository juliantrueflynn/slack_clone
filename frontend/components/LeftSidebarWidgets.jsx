import React from 'react';
import SidebarWidget from './SidebarWidget';
import './LeftSidebarWidgets.css';

const LeftSidebarWidgets = ({ menuGroups }) => (
  <div className="LeftSidebarWidgets">
    {menuGroups.map(({
      key,
      widgetTitle,
      component: Component,
      ...props
    }) => (
      <SidebarWidget key={key} widgetFor={key} widgetTitle={widgetTitle}>
        <Component {...props} />
      </SidebarWidget>
    ))}
  </div>
);

export default LeftSidebarWidgets;

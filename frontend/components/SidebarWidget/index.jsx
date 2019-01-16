import React from 'react';
import './styles.css';

const SidebarWidget = ({ widgetFor, widgetTitle, children }) => (
  <div className={`SidebarWidget SidebarWidget__${widgetFor}`}>
    {widgetTitle && <header className="SidebarWidget__header">{widgetTitle}</header>}
    {children}
  </div>
);

export default SidebarWidget;

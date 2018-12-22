import React from 'react';
import './LeftSidebarWidget.css';

const LeftSidebarWidget = ({
  widgetFor,
  title,
  component: Component,
  ...props
}) => (
  <div className={`LeftSidebarWidget LeftSidebarWidget__${widgetFor}`}>
    {title && <header className="LeftSidebarWidget__header">{title}</header>}
    <Component {...props} />
  </div>
);

export default LeftSidebarWidget;

import React from 'react';
import LeftSidebarWidget from './LeftSidebarWidget';

const LeftSidebarWidgets = ({ menuGroups }) => (
  <div className="LeftSidebarWidgets">
    {menuGroups.map(({ key, ...widget }) => (
      <LeftSidebarWidget key={key} widgetFor={key} {...widget} />
    ))}
  </div>
);

export default LeftSidebarWidgets;

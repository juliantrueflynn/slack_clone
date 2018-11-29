import React from 'react';

const LeftSidebarMenus = ({ menuGroups }) => {
  return (
    <div className="LeftSidebarMenus">
      {menuGroups.map(group => (
        <section key={group.key} className="LeftSidebar__widget">
          {group.title && (
            <header className="LeftSidebar__widget-head">{group.title}</header>
          )}
          {group.content}
        </section>
      ))}
    </div>
  );
};

export default LeftSidebarMenus;

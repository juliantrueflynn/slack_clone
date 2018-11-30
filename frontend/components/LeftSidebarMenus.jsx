import React from 'react';

const LeftSidebarMenus = ({ menuGroups }) => (
  menuGroups.map(group => (
    <section key={group.key} className="LeftSidebarMenus__group">
      {group.title && (
        <header className="LeftSidebarMenus__group-head">{group.title}</header>
      )}
      <group.component menuFor={group.key} items={group.items} {...group.props} />
    </section>
  ))
);

export default LeftSidebarMenus;

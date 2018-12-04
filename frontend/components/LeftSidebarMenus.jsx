import React from 'react';

const LeftSidebarMenus = ({ menuGroups }) => (
  menuGroups.map(group => (
    <section key={group.key} className={`LeftSidebarMenus__group LeftSidebarMenus__${group.key}`}>
      {group.title && (
        <header className="LeftSidebarMenus__group-head">{group.title}</header>
      )}
      <group.component items={group.items} {...group.props} />
    </section>
  ))
);

export default LeftSidebarMenus;

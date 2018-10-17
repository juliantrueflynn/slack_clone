import React from 'react';
import MenuItem from './MenuItem';
import './Menu.css';

const Menu = ({
  items,
  menuFor,
  isRow,
  inverseColor,
  toggleMenu,
  ...props
}) => {
  if (!items) {
    return null;
  }

  let classNames = 'Menu';
  if (menuFor) classNames += ` Menu--${menuFor}`;
  if (isRow) classNames += ' Menu--row';

  const itemKey = (item, link) => item.key || item.label + (link || '');

  return (
    <ul role="menu" className={classNames} {...props}>
      {items.map(({ link, className, ...item }) => (
        <MenuItem
          key={itemKey(item, link)}
          role="menuitem"
          to={link}
          className="MenuItem"
          toggleDdMenu={toggleMenu}
          {...item}
        />
      ))}
    </ul>
  );
};

export default Menu;

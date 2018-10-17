import React from 'react';
import classNames from 'classnames';
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

  const menuClassNames = classNames('Menu', {
    [`Menu--${menuFor}`]: menuFor,
    'Menu--row': isRow,
  });

  const itemKey = (item, link) => item.key || item.label + (link || '');

  return (
    <ul role="menu" className={menuClassNames} {...props}>
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

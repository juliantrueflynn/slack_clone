import React from 'react';
import MenuItem from './MenuItem';
import './Menu.css';

const Menu = ({
  items,
  menuFor,
  isRow,
  ...props
}) => {
  let classNames = 'Menu';
  if (menuFor) classNames += ` Menu--${menuFor}`;
  if (isRow) classNames += ' Menu--row';

  if (!items) return null;

  return (
    <ul role="menu" className={classNames} {...props}>
      {items.map(({ link, ...item }) => (
        <MenuItem
          key={item.label + (link || '')}
          role="menuitem"
          to={link}
          className="MenuItem"
          {...item}
        />
      ))}
    </ul>
  );
};

export default Menu;

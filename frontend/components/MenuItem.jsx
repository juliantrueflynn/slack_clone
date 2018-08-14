import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from './Button';
import './MenuItem.css';

const MenuItem = ({ className, ...props }) => {
  const {
    label,
    to: link,
    onClick,
    icon,
  } = props;
  let itemType = 'link';
  if (!link) itemType = onClick ? 'btn' : 'text';
  const itemClassName = `${className} MenuItem--${itemType}`;
  const contentClassName = `MenuItem__content MenuItem__content--${itemType}`;
  const itemText = (
    <span className="MenuItem__text">
      {icon && (
        <span className="MenuItem__icon">
          {icon}
        </span>
      )}
      <span className="MenuItem__label">
        {label}
      </span>
    </span>
  );

  return (
    <li role="none" className={itemClassName}>
      {itemType === 'link' && (
        <NavLink
          className={contentClassName}
          activeClassName="MenuItem__content--active"
          {...props}
        >
          {itemText}
        </NavLink>
      )}

      {itemType === 'btn' && (
        <Button className={contentClassName} {...props}>
          {itemText}
        </Button>
      )}

      {itemType === 'text' && (
        <span className={contentClassName} {...props}>
          {label}
        </span>
      )}
    </li>
  );
};

export default MenuItem;

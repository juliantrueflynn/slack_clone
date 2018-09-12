import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Button from './Button';
import './MenuItem.css';

const MenuItem = ({
  className,
  icon,
  label,
  altClassName,
  modifierClassName,
  ...props,
}) => {
  const { to: link, onClick } = props;

  let itemType = 'link';
  if (!link) itemType = onClick ? 'btn' : 'text';
  let itemClassName = `${className} MenuItem--${itemType}`;
  if (altClassName) itemClassName += ` MenuItem__${altClassName}`;
  if (modifierClassName) itemClassName += ` MenuItem--${modifierClassName}`;
  const contentClassName = `MenuItem__content MenuItem__content--${itemType}`;
  const itemText = (
    <Fragment>
      {icon && (
        <Fragment>
          {icon}
        </Fragment>
      )}
      {label}
    </Fragment>
  );

  return (
    <li className={itemClassName}>
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

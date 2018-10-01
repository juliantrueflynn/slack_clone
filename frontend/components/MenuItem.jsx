import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Button from './Button';
import './MenuItem.css';

class MenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    const { onClick, toggleDdMenu } = this.props;

    if (onClick) {
      onClick();
    }

    if (toggleDdMenu) {
      toggleDdMenu();
    }
  }

  render() {
    const {
      className,
      icon,
      label,
      altClassName,
      modifierClassName,
      onClick,
      toggleDdMenu,
      ...props
    } = this.props;

    const { to: link } = props;

    const itemProps = Object.assign({}, props);
    itemProps.onClick = this.handleOnClick;

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
            onClick={this.handleOnClick}
            activeClassName="MenuItem__content--active"
            {...itemProps}
          >
            {itemText}
          </NavLink>
        )}

        {itemType === 'btn' && (
          <Button className={contentClassName} {...itemProps}>
            {itemText}
          </Button>
        )}

        {itemType === 'text' && (
          <span className={contentClassName} {...itemProps}>
            {label}
          </span>
        )}
      </li>
    );
  }
}

export default MenuItem;

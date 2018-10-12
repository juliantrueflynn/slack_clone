import React from 'react';
import Button from './Button';
import LinkWithDrawer from '../util/linkUtil';
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
      match,
      history,
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

    return (
      <li className={itemClassName}>
        {itemType === 'link' && (
          <LinkWithDrawer
            isNavLink
            className={contentClassName}
            onClick={this.handleOnClick}
            activeClassName="MenuItem__content--active"
            {...itemProps}
          >
            {icon}
            {label}
          </LinkWithDrawer>
        )}

        {itemType === 'btn' && (
          <Button className={contentClassName} {...itemProps}>
            {icon}
            {label}
          </Button>
        )}

        {itemType === 'text' && (
          <span className={contentClassName} {...itemProps}>
            {icon}
            {label}
          </span>
        )}
      </li>
    );
  }
}

export default MenuItem;

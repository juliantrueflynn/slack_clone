import React from 'react';
import classNames from 'classnames';
import Button from '../Button';
import LinkWithDrawer from '../../util/linkUtil';
import './styles.css';
import DropdownTriggerContainer from '../../containers/DropdownTriggerContainer';

class MenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(e) {
    const { onClick } = this.props;

    if (onClick) {
      onClick(e);
    }
  }

  render() {
    const {
      className,
      keyId,
      icon,
      label,
      modifierClassName,
      onClick,
      toggleMenu,
      isOpen,
      dropdownType,
      condition,
      ...props
    } = this.props;

    if (condition !== undefined && !condition) {
      return null;
    }

    const { to: link } = props;

    const itemProps = { ...props };
    itemProps.onClick = this.handleOnClick;

    let itemType = 'link';
    if (dropdownType) {
      itemType = 'dropdown';
    } else if (!link && onClick) {
      itemType = 'btn';
    } else if (!link && !onClick) {
      itemType = 'text';
    }

    const itemIcon = icon && <span className="MenuItem__icon">{icon}</span>;

    const itemClassNames = classNames(className, {
      [`MenuItem--${itemType}`]: itemType,
      [`MenuItem__${keyId}`]: keyId,
      [`MenuItem__${keyId}--${modifierClassName}`]: keyId && modifierClassName,
      [`MenuItem--${modifierClassName}`]: !keyId && modifierClassName,
      'MenuItem--active': !keyId && isOpen,
      [`MenuItem__${keyId}--active`]: keyId && isOpen,
    });

    const contentClassNames = classNames('MenuItem__content', {
      [`MenuItem__content--${itemType}`]: itemType,
      'MenuItem__content--active': isOpen,
    });

    return (
      <li className={itemClassNames}>
        {itemType === 'link' && (
          <LinkWithDrawer
            isNavLink
            className={contentClassNames}
            onClick={this.handleOnClick}
            activeClassName="MenuItem__content--active"
            {...itemProps}
          >
            {itemIcon}
            {label}
          </LinkWithDrawer>
        )}
        {itemType === 'dropdown' && (
          <div className={contentClassNames}>
            <DropdownTriggerContainer dropdownType={dropdownType} {...itemProps}>
              {itemIcon}
              {label}
            </DropdownTriggerContainer>
          </div>
        )}
        {itemType === 'btn' && (
          <Button className={contentClassNames} {...itemProps}>
            {itemIcon}
            {label}
          </Button>
        )}
        {itemType === 'text' && (
          <span className={contentClassNames} {...itemProps}>
            {itemIcon}
            {label}
          </span>
        )}
      </li>
    );
  }
}

export default MenuItem;

import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink, Link } from 'react-router-dom';
import { selectDrawerPath } from '../reducers/selectors';

const mapStateToProps = state => ({
  isDrawerOpen: !!state.ui.drawer.drawerType,
  drawerUrl: selectDrawerPath(state),
});

const LinkWithDrawer = ({
  to,
  isNavLink,
  isDrawerOpen,
  hasNoDrawer,
  drawerUrl,
  staticContext,
  dispatch,
  ...props,
}) => {
  let linkTo = to;

  if (isDrawerOpen && !hasNoDrawer) {
    linkTo += drawerUrl;
  }

  if (isNavLink) {
    return <NavLink to={linkTo} {...props} />;
  }

  return <Link to={linkTo} {...props} />;
};

export default withRouter(connect(mapStateToProps)(LinkWithDrawer));

import { connect } from 'react-redux';
import React from 'react';

const isFetching = entityName => (WrappedComponent) => {
  const mapStateToProps = state => ({
    isFetching: state.ui.isFetching[entityName],
  });

  const IsFetching = props => <WrappedComponent {...props} />;
  return connect(mapStateToProps, null)(IsFetching);
};

export default isFetching;

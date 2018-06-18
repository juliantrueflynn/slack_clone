import { connect } from 'react-redux';
import React from 'react';

const isFetching = (WrappedComponent) => {
  const mapStateToProps = () => ({
    isFetching: true,
  });

  const IsFetching = props => <WrappedComponent {...props} />;
  return connect(mapStateToProps, null)(IsFetching);
};

export default isFetching;

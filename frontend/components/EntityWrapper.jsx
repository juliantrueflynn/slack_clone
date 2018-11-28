import React, { Fragment } from 'react';

class EntityWrapper extends React.Component {
  componentDidMount() {
    const { fetchEntityRequest } = this.props;

    fetchEntityRequest();
  }

  componentDidUpdate(prevProps) {
    const { entitySlug, fetchEntityRequest } = this.props;

    if (prevProps.entitySlug !== entitySlug) {
      fetchEntityRequest();
    }
  }

  render() {
    const { render } = this.props;

    return (
      <Fragment>
        {render()}
      </Fragment>
    );
  }
}

export default EntityWrapper;

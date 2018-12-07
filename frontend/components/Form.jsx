import React from 'react';
import classNames from 'classnames';
import './Form.css';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { formErrors: [], formSuccess: null };
    this.setFormSuccess = this.setFormSuccess.bind(this);
    this.setFormErrors = this.setFormErrors.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { errors, success } = this.props;

    if (!prevProps.success && success) {
      this.setFormSuccess(success);
    }

    if (prevProps.success && !success) {
      this.setFormSuccess(null);
    }

    if (!prevProps.errors.length && errors.length) {
      this.setFormErrors(errors);
    }

    if (prevProps.errors.length && !errors.length) {
      this.setFormErrors([]);
    }
  }

  componentWillUnmount() {
    this.setState({ formSuccess: null, formErrors: [] });
  }

  setFormSuccess(formSuccess) {
    this.setState({ formSuccess });
  }

  setFormErrors(formErrors) {
    this.setState({ formErrors });
  }

  render() {
    const { formFor, render } = this.props;
    const { formErrors, formSuccess } = this.state;

    const formClassNames = classNames('Form', {
      [`Form__${formFor}`]: formFor,
    });

    return (
      <div className={formClassNames}>
        {render({ formErrors, formSuccess })}
      </div>
    );
  }
}

export default Form;

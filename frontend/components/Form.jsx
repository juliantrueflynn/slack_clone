import React from 'react';
import FormField from './FormField';
import './Form.css';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDestroyErrors = this.handleDestroyErrors.bind(this);
  }

  componentWillUnmount() {
    const { formSuccess, destroyFormSuccess } = this.props;

    if (formSuccess) {
      destroyFormSuccess();
    }

    this.handleDestroyErrors();
  }

  handleDestroyErrors() {
    const { formErrors, destroyFormErrors } = this.props;

    if (formErrors && formErrors.length) {
      destroyFormErrors();
    }
  }

  handleSubmit(e) {
    const { submitForm } = this.props;

    if (submitForm) {
      submitForm(e);
      this.handleDestroyErrors();
    }
  }

  render() {
    const {
      formSuccess,
      formErrors,
      children,
      setFieldValue,
      fields,
      submitForm,
      destroyFormSuccess,
      destroyFormErrors,
      ...props
    } = this.props;

    const hasErrors = !!(formErrors && formErrors.length);

    return (
      <form className="Form" onSubmit={this.handleSubmit} {...props}>
        {hasErrors && (
          <div className="Form__alert Form__alert--errors">
            <ul>
              {formErrors.map(err => <li key={err}>{err}</li>)}
            </ul>
          </div>
        )}
        {formSuccess && <div className="Form__alert Form__alert--success">{formSuccess}</div>}
        {fields && fields.map(field => (
          <FormField key={field.id} setFieldValue={setFieldValue} {...field} />
        ))}
        {children}
      </form>
    );
  }
}

export default Form;

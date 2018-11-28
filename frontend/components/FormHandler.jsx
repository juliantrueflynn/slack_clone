import React from 'react';
import FormField from './FormField';

class FormHandler extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const { submitForm } = this.props;

    if (submitForm) {
      submitForm(e);
    }
  }

  render() {
    const {
      errors,
      success,
      children,
      setFieldValue,
      fields,
      submitForm,
      ...props
    } = this.props;
    const hasErrors = !!(errors && errors.length);

    return (
      <form onSubmit={this.handleSubmit} {...props}>
        {hasErrors && (
          <div className="Form__alert Form__alert--errors">
            <ul>
              {errors.map(err => <li key={err}>{err}</li>)}
            </ul>
          </div>
        )}
        {success && (
          <div className="Form__alert Form__alert--success">
            {success}
          </div>
        )}
        {fields.map(field => (
          <FormField key={field.id} setFieldValue={setFieldValue} {...field} />
        ))}
        {!!children && (
          <div className="Form__submit Btn__group">
            {children}
          </div>
        )}
      </form>
    );
  }
}

export default FormHandler;

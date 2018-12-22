import React from 'react';
import classNames from 'classnames';
import FormField from './FormField';
import './Form.css';

class Form extends React.Component {
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
      formFor,
      formSuccess,
      formErrors,
      children,
      setFieldValue,
      fields,
      submitForm,
      dispatch,
      ...props
    } = this.props;

    const hasErrors = !!(formErrors && formErrors.length);
    const formClassNames = classNames('Form', {
      [`Form__${formFor}`]: formFor,
    });

    return (
      <form className={formClassNames} onSubmit={this.handleSubmit} {...props}>
        {hasErrors && (
          <div className="Form__alert Form__alert--errors">
            <ul>
              {formErrors.map(err => <li key={err}>{err}</li>)}
            </ul>
          </div>
        )}
        {formSuccess && (
          <div className="Form__alert Form__alert--success">
            {formSuccess}
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

export default Form;

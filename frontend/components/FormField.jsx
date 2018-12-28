import React from 'react';
import MessageEditor from './MessageEditor';

class FormField extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { setFieldValue, id, onChange } = this.props;

    if (onChange) {
      onChange(e);
      return;
    }

    if (setFieldValue) {
      const fieldVal = e.target.value;
      setFieldValue(fieldVal, id);
    }
  }

  render() {
    const {
      label,
      condition,
      setFieldValue,
      ...field
    } = this.props;

    if (condition !== undefined && !condition) {
      return null;
    }

    const input = <input className="Form__control" onChange={this.handleChange} {...field} />;

    if (field.type === 'checkbox') {
      return (
        <label htmlFor={field.id} className="Form__checkbox">
          <span className="Form__checkbox-label">{label}</span>
          {input}
        </label>
      );
    }

    return (
      <div className="Form__group">
        {label && <label htmlFor={field.id}>{label}</label>}
        {input}
      </div>
    );
  }
}

export default FormField;

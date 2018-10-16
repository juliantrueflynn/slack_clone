import React from 'react';
import { camelize } from 'humps';
import './Form.css';

class Form extends React.Component {
  componentDidMount() {
    const { destroySuccess, success } = this.props;

    if (success) {
      destroySuccess();
    }
  }

  render() {
    const {
      formFor,
      render,
      success,
      errors,
    } = this.props;
    const hasErrors = !!(errors && errors.length);
    const classNames = `Form Form__${formFor}`;

    return (
      <div className={classNames}>
        {hasErrors && (
          <div className="Form__alert Form__alert--errors">
            <ul>
              {errors.map(error => (
                <li key={camelize(error)}>
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}
        {success && (
          <div className="Form__alert Form__alert--success">
            {success}
          </div>
        )}
        {render()}
      </div>
    );
  }
}

export default Form;

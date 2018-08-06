import React from 'react';
import withModal from './withModal';
import Label from './Label';
// import Button from './Button';
// import FormErrors from './Layout/FormErrors';

class PreferencesModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ title: '' });
  }

  handleInputValue(property) {
    return event => this.setState({ [property]: event.target.value });
  }

  render() {
    const { title } = this.state;

    return (
      <form className="Form Form__settings" onSubmit={this.handleSubmit}>
        <div className="Form__group">
          <Label htmlFor="title">
            Name
          </Label>
          <input
            type="text"
            name="title"
            placeholder="e.g. leads"
            value={title}
            onChange={this.handleInputValue('title')}
          />
        </div>
      </form>
    );
  }
}

const modalProps = {
  modalType: 'SETTINGS',
  modalTitle: 'Workspace Settings',
};

export default withModal(modalProps)(PreferencesModal);

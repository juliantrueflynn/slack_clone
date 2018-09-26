import React from 'react';
import Button from './Button';
import withForm from './withForm';
import withModal from './withModal';
import FormErrors from './FormErrors';

class CreateWorkspaceModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '', slug: '' };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleInputValueUpdate(property) {
    return event => this.setState({ [property]: event.target.value });
  }

  handleFormSubmit(event) {
    event.preventDefault();

    const { createEntityRequest } = this.props;
    const { title, slug } = this.state;
    const workspace = { title, slug };
    createEntityRequest({ workspace });
  }

  render() {
    const { title, slug } = this.state;

    return (
      <div className="Page__container">
        <form className="Form__workspace" onSubmit={this.handleFormSubmit}>
          <FormErrors entity="workspace" />
          <div className="Form__group">
            <label htmlFor="title">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={title}
              placeholder="Title"
              onChange={this.handleInputValueUpdate('title')}
            />
          </div>
          <div>
            <label htmlFor="slug">
              Workspace URL
            </label>
            <input
              type="text"
              name="slug"
              value={slug}
              placeholder="Workspace URL"
              onChange={this.handleInputValueUpdate('slug')}
            />
          </div>
          <Button type="submit" buttonFor="submit">
            Create Workspace
          </Button>
        </form>
      </div>
    );
  }
}

const modalProps = {
  modalType: 'MODAL_WORKSPACE',
  modalTitle: 'Create a Workspace'
};

export default withModal(modalProps)(withForm({ formFor: 'workspace' })(CreateWorkspaceModal));

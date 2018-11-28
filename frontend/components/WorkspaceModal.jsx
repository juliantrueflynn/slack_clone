import React from 'react';
import Button from './Button';
import withForm from './withForm';
import Modal from './Modal';

class WorkspaceModal extends React.Component {
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

    const { formDispatchRequest } = this.props;
    const { title, slug } = this.state;
    const workspace = { title, slug };
    formDispatchRequest({ workspace });
  }

  render() {
    const { modalClose } = this.props;
    const { title, slug } = this.state;

    return (
      <Modal modalFor="workspace" isOpen modalTitle="Create a Workspace" close={modalClose}>
        <form onSubmit={this.handleFormSubmit}>
          <div className="Form__group">
            <label htmlFor="title">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="Form__control"
              placeholder="Title"
              value={title}
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
              className="Form__control"
              placeholder="Workspace URL"
              value={slug}
              onChange={this.handleInputValueUpdate('slug')}
            />
          </div>
          <div className="Btn__group">
            <Button type="submit" color="green" buttonFor="save-profile" size="lg">
              Create workspace
            </Button>
            <Button onClick={() => modalClose()} size="lg">
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    );
  }
}

const formProps = { type: 'WORKSPACE_CREATE_REQUEST', payloadName: 'workspace' };

export default withForm(formProps)(WorkspaceModal);

import React from 'react';
import Button from './Button';
import withModal from './withModal';
import withForm from './withForm';

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
      <div className="PublicView__container">
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
      </div>
    );
  }
}

const modalProps = { modalType: 'MODAL_WORKSPACE', modalTitle: 'Create a Workspace' };
const formProps = { type: 'WORKSPACE_CREATE_REQUEST', payloadName: 'workspace' };

export default withModal(modalProps)(withForm(formProps)(WorkspaceModal));
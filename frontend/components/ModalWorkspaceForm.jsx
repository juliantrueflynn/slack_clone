import React from 'react';
import Button from './Button';
import FormContainer from './FormContainer';

class ModalWorkspaceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '', slug: '' };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFieldValueChange = this.handleFieldValueChange.bind(this);
  }

  handleFieldValueChange(value, prop) {
    this.setState({ [prop]: value });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const { createWorkspaceRequest } = this.props;
    const { title, slug } = this.state;
    const workspace = { title, slug };
    createWorkspaceRequest(workspace);
  }

  render() {
    const { close } = this.props;
    const { title, slug } = this.state;

    const fields = [
      {
        id: 'title',
        type: 'text',
        value: title,
        placeholder: 'Title',
        label: 'Title',
      },
      {
        id: 'slug',
        type: 'text',
        value: slug,
        placeholder: 'Workspace URL',
      }
    ];

    return (
      <FormContainer
        fields={fields}
        setFieldValue={this.handleFieldValueChange}
        submitForm={this.handleFormSubmit}
      >
        <Button type="submit" color="green" size="lg">Create workspace</Button>
        <Button onClick={close} size="lg">Cancel</Button>
      </FormContainer>
    );
  }
}

export default ModalWorkspaceForm;

import React from 'react';
import Button from './Button';
import withForm from './withForm';
import FormHandler from './FormHandler';

class WorkspaceFormModal extends React.Component {
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

    const { formDispatchRequest } = this.props;
    const { title, slug } = this.state;
    const workspace = { title, slug };
    formDispatchRequest({ workspace });
  }

  render() {
    const { close, form: { formErrors } } = this.props;
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
      <FormHandler
        fields={fields}
        setFieldValue={this.handleFieldValueChange}
        submitForm={this.handleFormSubmit}
        errors={formErrors}
      >
        <Button type="submit" color="green" size="lg">Create workspace</Button>
        <Button onClick={close} size="lg">Cancel</Button>
      </FormHandler>
    );
  }
}

const formProps = { type: 'WORKSPACE_CREATE_REQUEST', payloadName: 'workspace' };

export default withForm(formProps)(WorkspaceFormModal);

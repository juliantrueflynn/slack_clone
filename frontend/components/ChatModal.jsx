import React from 'react';
import Button from './Button';
import withForm from './withForm';
import Modal from './Modal';
import FormHandler from './FormHandler';

class ChatModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFieldValueChange = this.handleFieldValueChange.bind(this);
  }

  handleFieldValueChange(value, prop) {
    this.setState({ [prop]: value });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const { workspaceId, formDispatchRequest } = this.props;
    const { title } = this.state;
    formDispatchRequest({ title, workspaceId });
  }

  render() {
    const { modalClose, form: { formErrors } } = this.props;
    const { title } = this.state;

    const fields = [
      {
        id: 'title',
        type: 'text',
        placeholder: 'e.g. leads',
        value: title,
      },
    ];

    return (
      <Modal isOpen modalTitle="Create a Channel" modalFor="chat" close={modalClose}>
        <p className="Form__text">
          Channels are where your members communicate.
          They&#39;re best when organized around a topic — #leads, for example.
        </p>
        <FormHandler
          fields={fields}
          setFieldValue={this.handleFieldValueChange}
          submitForm={this.handleFormSubmit}
          errors={formErrors}
        >
          <Button type="submit" size="lg" color="green">
            Create Channel
          </Button>
          <Button buttonFor="modal" size="lg" onClick={() => modalClose()}>
            Close
          </Button>
        </FormHandler>
      </Modal>
    );
  }
}

const formProps = { type: 'CHANNEL_CREATE_REQUEST', payloadName: 'channel' };

export default withForm(formProps)(ChatModal);

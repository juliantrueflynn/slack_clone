import React, { Fragment } from 'react';
import Button from './Button';
import FormContainer from './FormContainer';

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

    const { workspaceId, createChannelRequest } = this.props;
    const { title } = this.state;

    createChannelRequest({ title, workspaceId });
  }

  render() {
    const { close } = this.props;
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
      <Fragment>
        <p className="Form__text">
          Channels are where your members communicate.
          They&#39;re best when organized around a topic — #leads, for example.
        </p>
        <FormContainer
          formFor="channel"
          fields={fields}
          setFieldValue={this.handleFieldValueChange}
          submitForm={this.handleFormSubmit}
        >
          <Button type="submit" size="lg" color="green">Create channel</Button>
          <Button buttonFor="modal" size="lg" onClick={close}>Close</Button>
        </FormContainer>
      </Fragment>
    );
  }
}

export default ChatModal;

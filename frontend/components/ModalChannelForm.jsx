import React, { Fragment } from 'react';
import Button from './Button';
import FormContainer from './FormContainer';

class ModalChannelForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '', topic: '' };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFieldValueChange = this.handleFieldValueChange.bind(this);
  }

  componentDidMount() {
    const { chatroom } = this.props;
    const { title, topic } = this.state;

    if (chatroom) {
      if (chatroom.title && !title) {
        this.setState({ title: chatroom.title });
      }

      if (chatroom.topic && !topic) {
        this.setState({ topic: chatroom.topic });
      }
    }
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const { channelFormRequest, workspaceId, chatroom } = this.props;
    const chProps = { workspaceId, ...this.state };
    chProps.slug = chatroom ? chatroom.slug : null;

    channelFormRequest(chProps);
  }

  handleFieldValueChange(value, prop) {
    this.setState({ [prop]: value });
  }

  render() {
    const { close, currentUserSlug, chatroom } = this.props;
    const { title, topic } = this.state;

    let buttonText = 'Create channel';
    let fields = [{
      id: 'title',
      type: 'text',
      placeholder: 'e.g. leads',
      value: title,
    }];

    if (chatroom) {
      buttonText = 'Update';
      fields = [
        {
          id: 'title',
          label: 'Title',
          type: 'text',
          value: title,
        },
        {
          id: 'topic',
          label: 'Topic',
          value: topic,
          placeholder: 'e.g. Discuss XYZ',
          condition: currentUserSlug === chatroom.ownerSlug,
        },
      ];
    }

    return (
      <Fragment>
        {!chatroom && (
          <p className="Form__text">
            Channels are where your members communicate.
            They&#39;re best when organized around a topic — #leads, for example.
          </p>
        )}
        <FormContainer
          submitForm={this.handleFormSubmit}
          setFieldValue={this.handleFieldValueChange}
          hasNoSubmittingText={!!chatroom}
          fields={fields}
        >
          <Button type="submit" color="green" size="lg">{buttonText}</Button>
          <Button onClick={close} size="lg">Cancel</Button>
        </FormContainer>
      </Fragment>
    );
  }
}

export default ModalChannelForm;

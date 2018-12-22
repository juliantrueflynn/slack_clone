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
    const { channel } = this.props;
    const { title, topic } = this.state;

    if (channel) {
      if (channel.title && !title) {
        this.setState({ title: channel.title });
      }

      if (channel.topic && !topic) {
        this.setState({ topic: channel.topic });
      }
    }
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const { channelFormRequest, workspaceId, channel } = this.props;

    const channelProps = { workspaceId, ...this.state };
    channelProps.slug = channel ? channel.slug : null;

    channelFormRequest(channelProps);
  }

  handleFieldValueChange(value, prop) {
    this.setState({ [prop]: value });
  }

  render() {
    const { close, currentUserSlug, channel } = this.props;
    const { title, topic } = this.state;

    let buttonText = 'Create channel';
    let fields = [{
      id: 'title',
      type: 'text',
      placeholder: 'e.g. leads',
      value: title,
    }];

    if (channel) {
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
          condition: currentUserSlug === channel.ownerSlug,
        },
      ];
    }

    return (
      <Fragment>
        {!channel && (
          <p className="Form__text">
            Channels are where your members communicate.
            They&#39;re best when organized around a topic — #leads, for example.
          </p>
        )}
        <FormContainer
          formFor="channel"
          submitForm={this.handleFormSubmit}
          setFieldValue={this.handleFieldValueChange}
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

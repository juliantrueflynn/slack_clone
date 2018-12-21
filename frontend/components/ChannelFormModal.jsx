import React from 'react';
import Button from './Button';
import withForm from './withForm';
import FormHandler from './FormHandler';

class ChannelFormModal extends React.Component {
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

    const { formDispatchRequest, channel: { slug } } = this.props;
    const { title, topic } = this.state;
    formDispatchRequest({ slug, title, topic });
  }

  handleFieldValueChange(value, prop) {
    this.setState({ [prop]: value });
  }

  render() {
    const {
      close,
      currentUserSlug,
      channel,
      form: { formSuccess, formErrors },
    } = this.props;
    const { title, topic } = this.state;

    const fields = [
      {
        id: 'title',
        label: 'Title',
        value: title,
        type: 'text',
      },
      {
        id: 'topic',
        label: 'Topic',
        value: topic,
        placeholder: 'e.g. Discuss XYZ',
        condition: currentUserSlug === channel.ownerSlug,
      }
    ];

    return (
      <FormHandler
        submitForm={this.handleFormSubmit}
        setFieldValue={this.handleFieldValueChange}
        fields={fields}
        success={formSuccess}
        errors={formErrors}
      >
        <Button type="submit" color="green" size="lg">
          Update
        </Button>
        <Button onClick={close} size="lg">
          Cancel
        </Button>
      </FormHandler>
    );
  }
}

const formProps = { type: 'CHANNEL_UPDATE_REQUEST', payloadName: 'channel' };

export default withForm(formProps)(ChannelFormModal);

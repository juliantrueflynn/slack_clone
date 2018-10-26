import React from 'react';
import Button from './Button';
import withForm from './withForm';
import withModal from './withModal';

class ChannelEditorModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = { title: '', topic: '' };

    this.handleInputVal = this.handleInputVal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();

    const { formDispatchRequest, channel: { slug } } = this.props;
    const { title, topic } = this.state;
    formDispatchRequest({ slug, title, topic });
  }

  handleInputVal(prop) {
    return e => this.setState({ [prop]: e.target.value });
  }

  render() {
    const { modalClose, currentUser, channel } = this.props;
    const { title, topic } = this.state;

    const isOwner = currentUser.id === channel.ownerId;

    return (
      <form onSubmit={this.handleSubmit}>
        {isOwner && (
          <div className="Form__group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="Form__control"
              value={title}
              onChange={this.handleInputVal('title')}
            />
          </div>
        )}
        <div className="Form__group">
          <label htmlFor="topic">Topic</label>
          <input
            type="text"
            className="Form__control"
            placeholder="e.g. Discuss XYZ"
            value={topic}
            onChange={this.handleInputVal('topic')}
          />
        </div>
        <div className="Btn__group">
          <Button type="submit" color="green" buttonFor="save-profile" size="lg">
            Update
          </Button>
          <Button onClick={() => modalClose()} size="lg">
            Cancel
          </Button>
        </div>
      </form>
    );
  }
}

const modalProps = { modalType: 'MODAL_EDIT_CHANNEL', modalTitle: 'Update channel' };
const formProps = { type: 'CHANNEL_UPDATE_REQUEST', payloadName: 'channel' };

export default withModal(modalProps)(withForm(formProps)(ChannelEditorModal));

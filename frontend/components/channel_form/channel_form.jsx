import React from 'react';
import Modal from 'react-modal';

class ChannelForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  componentWillMount() {
    Modal.setAppElement('#root');
  }

  handleModalClose(event) {
    event.preventDefault();
    this.props.modalClose();
  }

  handleInputValue(property) {
    return event => this.setState({ [property]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const channel = {
      title: this.state.title,
      ownerId: this.props.currentUserId,
      workspaceId: this.props.workspaceId,
    };
    this.props.createChannel(channel);
  }

  render() {
    return (
      <Modal
        isOpen={ this.props.isModalOpen }
        onRequestClose={ this.handleModalClose }
        style={{
          overlay: {
            backgroundColor: 'white'
          },
          content: {
            border: 'none',
          },
        }}
        contentLabel="Create channel">

        <button onClick={ this.handleModalClose }>X</button>
        <h1>Create a channel</h1>

        <form
          className="form form__create-channel"
          onSubmit={ this.handleSubmit }>
          <p>
            Channels are where your members communicate.
            They're best when organized around a topic — #leads, for example.
          </p>
          <div>
            <label>Name</label>
            <input
              type="text"
              placeholder="e.g. leads"
              value={ this.state.title }
              onChange={ this.handleInputValue('title') } />
          </div>
          <button onClick={ this.handleModalClose }>Close</button>
          <input type="submit" value="Create Channel" />
        </form>
      </Modal>
    );
  }
}

export default ChannelForm;
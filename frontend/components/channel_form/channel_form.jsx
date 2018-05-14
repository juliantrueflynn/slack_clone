import React from 'react';
import Modal from 'react-modal';
import './channel_form.css';

class ChannelForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { title: "" };

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

    const { workspaceId, modalClose, createChannel } = this.props;
    const channel = { title: this.state.title, workspaceId };
    createChannel(channel);
    modalClose();
    this.setState({ title: "" });
  }

  errors() {
    if (this.props.errors.length) {
      return (
        <ul className="errors errors__form">
          {this.props.errors.map((error, i) => (
            <li className="errors__item" key={`newChannelError${i}`}>
              {error}
            </li>
          ))}
        </ul>
      );
    }
  }

  render() {
    return (
      <Modal
        className="modal modal__new-channel"
        isOpen={this.props.isModalOpen}
        onRequestClose={this.handleModalClose}
        style={{
          overlay: { backgroundColor: 'white' },
          content: { border: 'none' },
        }}
        contentLabel="Create channel"
      >
        <button className="modal__close" onClick={this.handleModalClose}>
          &#10006;
        </button>
        <header className="modal__header">
          <h1 className="modal__title">Create a channel</h1>
        </header>

        <form
          className="form form__new-channel"
          onSubmit={this.handleSubmit}
        >
          <p>
            Channels are where your members communicate. They're best when
            organized around a topic — #leads, for example.
          </p>
          <div className="form__group">
            <label>Name</label>
            <input
              type="text"
              placeholder="e.g. leads"
              value={this.state.title}
              onChange={this.handleInputValue('title')}
            />
          </div>
          <button
            className="button button__modal"
            onClick={this.handleModalClose}
          >
            Close
          </button>
          <input
            className="button button__modal"
            type="submit"
            value="Create Channel"
          />
        </form>
      </Modal>
    );
  }
}

export default ChannelForm;
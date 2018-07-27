import React from 'react';
import MessageEditor, { convertForSubmit } from '../../util/editorUtil';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const message = {
      body: convertForSubmit(this.props.editorState),
      slug: this.props.messageSlug,
    };
    this.props.updateMessageRequest(message);
    this.props.handleEditToggle();
  }

  render() {
    return (
      <div className="msg">
        <form onSubmit={this.handleSubmit}>
          <MessageEditor
            editorState={this.props.editorState}
            onChange={this.props.onChange}
            hasEmoji
          />

          <button className="btn btn__cancel" onClick={this.props.handleEditToggle}>
            Cancel
          </button>
          <button type="submit" className="btn btn__submit">Save changes</button>
        </form>
      </div>
    );
  }
}

export default Message;

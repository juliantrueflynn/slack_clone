import React from 'react';
import { convertToRaw } from 'draft-js';
import MessageEditor from '../../util/editorUtil';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const currentContent = this.props.editorState.getCurrentContent();
    const message = {
      body: JSON.stringify(convertToRaw(currentContent)),
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

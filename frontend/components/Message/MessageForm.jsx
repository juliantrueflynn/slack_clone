import React from 'react';
import 'draft-js-emoji-plugin/lib/plugin.css';
import FormErrors from '../Layout/FormErrors';
import { convertForSubmit, clearEditor, createEmptyEditor } from '../../util/editorUtil';
import MessageEditor from '../MessageEditor';
import './MessageForm.css';

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: createEmptyEditor() };
    this.onChange = this.onChange.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
  }

  onChange(editorState) {
    this.setState({ editorState });
  }

  handleMessageSubmit(event) {
    event.preventDefault();

    const { editorState } = this.state;
    const body = convertForSubmit(editorState);
    const { channelId, parentMessageId, createMessageRequest } = this.props;

    createMessageRequest({ body, channelId, parentMessageId });
    this.setState({ editorState: clearEditor(editorState) });
  }

  render() {
    const { currentUser, parentMessageId, placeholder } = this.props;
    const { editorState } = this.state;

    return (
      <form className={`msg-form ${parentMessageId && 'msg-form__sidebar'}`} onSubmit={this.handleMessageSubmit}>
        <FormErrors entity="message" />

        {parentMessageId && currentUser && (
          <img
            src="https://via.placeholder.com/40x40"
            className="avatar__form"
            alt={`${currentUser.username}'s avatar`}
            height="40"
            width="40"
          />
        )}

        <div className="msg-form__body">
          <MessageEditor
            editorState={editorState}
            onChange={this.onChange}
            placeholder={placeholder || 'Reply...'}
          />
          <button type="submit" className="btn btn__submit">
            Add Message
          </button>
        </div>
      </form>
    );
  }
}

export default MessageForm;

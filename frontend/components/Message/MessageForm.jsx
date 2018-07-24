import React from 'react';
import 'draft-js-emoji-plugin/lib/plugin.css';
import Editor from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import { EditorState, convertToRaw } from 'draft-js';
import FormErrors from '../Layout/FormErrors';
import './MessageForm.css';

const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = this.onChange.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
  }

  onChange(editorState) {
    this.setState({ editorState });
  }

  handleMessageSubmit(event) {
    event.preventDefault();

    const { editorState } = this.state;
    const currentContent = editorState.getCurrentContent();
    const body = JSON.stringify(convertToRaw(currentContent));
    const { channelId, parentMessageId, createMessageRequest } = this.props;
    const clearEditorState = EditorState.createEmpty();

    createMessageRequest({ body, channelId, parentMessageId });
    this.setState({ editorState: clearEditorState });
  }

  render() {
    const { currentUser, parentMessageId } = this.props;

    return (
      <form className={`msg-form ${parentMessageId && 'msg-form__sidebar'}`} onSubmit={this.handleMessageSubmit}>
        <FormErrors entity="message" />

        {parentMessageId && currentUser && (
          <img src="https://via.placeholder.com/40x40" className="avatar__form" alt={`${currentUser.username}'s avatar`} />
        )}

        <div className="msg-form__body">
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={[emojiPlugin]}
          />
          <EmojiSuggestions />
          <EmojiSelect />
          <button type="submit" className="btn btn__submit">Add Message</button>
        </div>
      </form>
    );
  }
}

export default MessageForm;

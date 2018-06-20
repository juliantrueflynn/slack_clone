import React from 'react';
import 'draft-js-emoji-plugin/lib/plugin.css';
import 'draft-js/dist/Draft.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import FormErrors from '../Layout/FormErrors';

const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

class MessageForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = editorState => this.setState({ editorState });
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
  }

  handleMessageSubmit(event) {
    event.preventDefault();

    const { editorState } = this.state;
    const currentContent = editorState.getCurrentContent();
    const message = {
      body: JSON.stringify(convertToRaw(currentContent)),
      channelId: this.props.channelSlug,
      parentMessageId: this.props.parentMessageId,
    };
    const clearEditorState = EditorState.push(editorState, ContentState.createFromText(''), 'remove-range');

    this.props.createMessageRequest(message, this.props.parentMessageSlug);
    this.setState({ editorState: clearEditorState });
  }

  render() {
    return (
      <div className="msg-form-container">
        <FormErrors entity="message" />

        <form className="msg-form" onSubmit={this.handleMessageSubmit}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={[emojiPlugin]}
          />

          <EmojiSuggestions />
          <EmojiSelect />

          <button type="submit" className="btn btn__submit">
            Add Message
          </button>
        </form>
      </div>
    );
  }
}

export default MessageForm;

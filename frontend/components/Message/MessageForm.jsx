import React from 'react';
import 'draft-js-emoji-plugin/lib/plugin.css';
import 'draft-js/dist/Draft.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import FormErrors from '../Layout/FormErrors';

const emojiPlugin = createEmojiPlugin();
// Commenting out until optimized. Currently making page too slow for debugging.
// const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

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
      channelId: this.props.channelId,
      parentMessageId: this.props.parentMessageId,
    };
    const clearEditorState = EditorState.push(editorState, ContentState.createFromText(''), 'remove-range');

    this.props.createMessageRequest(message);
    this.setState({ editorState: clearEditorState });
  }

  render() {
    return (
      <form className="msg-form" onSubmit={this.handleMessageSubmit}>
        <FormErrors entity="message" />

        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={[emojiPlugin]}
        />

        {/* Commenting out until optimized. Currently making page too slow for debugging. */}
        {/* <EmojiSuggestions /> */}
        {/* <EmojiSelect /> */}

        <button type="submit" className="btn btn__submit">
          Add Message
        </button>
      </form>
    );
  }
}

export default MessageForm;

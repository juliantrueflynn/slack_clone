import React from 'react';
import Editor from 'draft-js-plugins-editor';
import { EditorState, convertToRaw } from 'draft-js';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import FormErrors from '../Layout/FormErrors';
import 'draft-js/dist/Draft.css';
import 'draft-js-emoji-plugin/lib/plugin.css';

const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

class MessageForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { editorState: EditorState.createEmpty() };

    this.onChange = editorState => this.setState({
      editorState
    });

    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
  }

  handleMessageSubmit(event) {
    event.preventDefault();

    const currentContent = this.state.editorState.getCurrentContent();
    const body = JSON.stringify(convertToRaw(currentContent));
  
    const message = {
      body,
      channelId: this.props.channelSlug,
      parentMessageId: this.props.parentMessageId
    };

    this.props.createMessageRequest(message, this.props.parentMessageSlug);
  }

  render() {
    return (
      <div className="msg-form-container">
        <FormErrors entity="message" />
        
        {this.state.htmlMessageBody}
        
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
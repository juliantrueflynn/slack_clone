import React from 'react';
import 'draft-js/dist/Draft.css';
import 'draft-js-emoji-plugin/lib/plugin.css';
import Editor from 'draft-js-plugins-editor';
import { EditorState, convertFromRaw } from 'draft-js';
import createEmojiPlugin from 'draft-js-emoji-plugin';

const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

class MessageEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: props.editorState };
    this.onChange = this.onChange.bind(this);
    this.focus = this.focus.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.readOnly && prevProps.content !== this.props.content) {
      const newContentState = convertFromRaw(JSON.parse(this.props.content));
      const editorState = EditorState.push(this.state.editorState, newContentState);
      this.onChange(editorState);
    }
  }

  onChange(editorState) {
    this.setState({ editorState });
    this.props.onChange(editorState);
  }

  focus() {
    this.editor.focus();
  }

  render() {
    const { hasEmoji, readOnly } = this.props;

    return (
      <div className="message-editor" role="presentation" onClick={this.focus}>
        <Editor
          ref={(element) => { this.editor = element; }}
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={[emojiPlugin]}
          readOnly={readOnly || false}
        />
        {!readOnly && hasEmoji && (<EmojiSuggestions />)}
        {!readOnly && hasEmoji && (<EmojiSelect />)}
      </div>
    );
  }
}

export default MessageEditor;

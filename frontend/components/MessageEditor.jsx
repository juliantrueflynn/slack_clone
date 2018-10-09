import React from 'react';
import 'draft-js/dist/Draft.css';
import 'draft-js-emoji-plugin/lib/plugin.css';
import Editor from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import { emojiConfig } from '../util/editorUtil';
import './MessageEditor.css';

class MessageEditor extends React.Component {
  constructor(props) {
    super(props);
    this.emojiPlugin = createEmojiPlugin(emojiConfig);
    this.editor = React.createRef();
    this.focus = this.focus.bind(this);
  }

  focus() {
    this.editor.focus();
  }

  render() {
    const { readOnly, ...props } = this.props;
    const { EmojiSuggestions, EmojiSelect } = this.emojiPlugin;
    const plugins = [this.emojiPlugin];
    const editorClassNames = `Editor ${readOnly ? 'Editor__locked' : 'Editor__unlocked'}`;

    return (
      <div
        role="presentation"
        className={editorClassNames}
        onClick={this.focus}
      >
        <Editor
          ref={this.editor}
          plugins={plugins}
          readOnly={readOnly || false}
          {...props}
        />
        {readOnly || (<EmojiSuggestions />)}
        {readOnly || (<EmojiSelect />)}
      </div>
    );
  }
}

export default MessageEditor;

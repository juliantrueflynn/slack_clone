import React from 'react';
import classNames from 'classnames';
import 'draft-js/dist/Draft.css';
import 'draft-js-emoji-plugin/lib/plugin.css';
import Editor from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import { emojiConfig } from '../util/editorUtil';
import './MessageEditor.css';

class MessageEditor extends React.Component {
  constructor(props) {
    super(props);
    this.editor = React.createRef();
    this.emojiPlugin = createEmojiPlugin(emojiConfig);
    this.focus = this.focus.bind(this);
  }

  componentDidMount() {
    const { readOnly } = this.props;

    if (!readOnly) {
      this.focus();
    }
  }

  componentDidUpdate(prevProps) {
    const { containerId, readOnly } = this.props;

    if (!prevProps.readOnly && !readOnly) {
      if (prevProps.containerId && prevProps.containerId !== containerId) {
        this.focus();
      }
    }

    if (prevProps.readOnly && !readOnly) {
      this.focus();
    }
  }

  focus() {
    if (this.editor && this.editor.current) {
      this.editor.current.focus();
    }
  }

  render() {
    const {
      readOnly,
      editorState,
      onChange,
      placeholder,
    } = this.props;
    const { EmojiSuggestions, EmojiSelect } = this.emojiPlugin;

    const plugins = [this.emojiPlugin];
    const editorClassNames = classNames('Editor', {
      Editor__locked: readOnly,
      Editor__unlocked: !readOnly,
    });

    return (
      <div role="presentation" className={editorClassNames} onClick={this.focus}>
        <Editor
          ref={this.editor}
          plugins={plugins}
          editorState={editorState}
          onChange={onChange}
          readOnly={readOnly}
          placeholder={placeholder}
        />
        {readOnly || (<EmojiSuggestions />)}
        {readOnly || (<EmojiSelect />)}
      </div>
    );
  }
}

export default MessageEditor;

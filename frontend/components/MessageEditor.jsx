import React from 'react';
import classNames from 'classnames';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import Editor from 'draft-js-plugins-editor';
import 'draft-js/dist/Draft.css';
import 'draft-js-emoji-plugin/lib/plugin.css';
import './MessageEditor.css';
import { emojiConfig } from '../util/editorUtil';

class MessageEditor extends React.Component {
  constructor(props) {
    super(props);
    this.editor = React.createRef();
    this.focus = this.focus.bind(this);

    const emojiPlugin = createEmojiPlugin(emojiConfig);
    const { EmojiSelect } = emojiPlugin;
    this.plugins = [emojiPlugin];
    this.components = { EmojiSelect };
  }

  componentDidMount() {
    const { readOnly } = this.props;

    if (!readOnly) {
      this.focus();
    }
  }

  componentDidUpdate(prevProps) {
    const { readOnly } = this.props;

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
    const { containerId, children, ...props } = this.props;
    const { readOnly } = props;

    const editorClassNames = classNames('Editor', {
      Editor__locked: readOnly,
      Editor__unlocked: !readOnly,
    });

    return (
      <div role="presentation" className={editorClassNames} onClick={this.focus}>
        <Editor ref={this.editor} plugins={this.plugins} {...props} />
        {readOnly || <this.components.EmojiSelect />}
      </div>
    );
  }
}

export default MessageEditor;

import React, { Fragment } from 'react';
import Editor from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import 'draft-js/dist/Draft.css';
import 'draft-js-emoji-plugin/lib/plugin.css';

const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

// handleKeyCommand(command) {
  // const { editorState } = this.state;
  // const newState = RichUtils.handleKeyCommand(editorState, command);
  // if (newState) {
    // this.onChange(newState);
    // return true;
  // }
  // return false;
// }

export const MessageEditor = ({ editorState, onChange, readOnly }) => (
  <Fragment>
    <Editor
      editorState={editorState}
      onChange={onChange}
      plugins={[emojiPlugin]}
    />

    <EmojiSuggestions />
    <EmojiSelect />
  </Fragment>
);

export const MessageEditorView = ({ editorState, onChange }) => (
  <Editor
    editorState={editorState}
    onChange={onChange}
    plugins={[emojiPlugin]}
    readOnly
  />
);
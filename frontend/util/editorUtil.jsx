import React from 'react';
import {
  ContentState,
  EditorState,
  convertFromRaw,
  convertToRaw
} from 'draft-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const createEmptyEditor = () => EditorState.createEmpty();

export const clearEditor = (editorState) => {
  const emptyContentState = ContentState.createFromText('');
  const clearedEditorState = EditorState.push(editorState, emptyContentState, 'remove-range');
  return EditorState.moveFocusToEnd(clearedEditorState);
};

export const convertForSubmit = (editorState) => {
  const currentContent = editorState.getCurrentContent();
  const messageBody = convertToRaw(currentContent);
  return JSON.stringify(messageBody);
};

export const mountEditorState = (content) => {
  try {
    const newContentState = convertFromRaw(JSON.parse(content));
    return EditorState.createWithContent(newContentState);
  } catch (errors) {
    return createEmptyEditor();
  }
};

export const EmojiButtonIcon = () => (
  <span className="EmojiButtonIcon fa-layers fa-fw">
    <FontAwesomeIcon icon="circle" className="EmojiButtonIcon__bg" />
    <FontAwesomeIcon icon={['far', 'smile']} />
  </span>
);

export const emojiConfig = {
  theme: {
    emoji: 'emoji',
    emojiSuggestions: 'emojiSuggestions',

    emojiSuggestionsEntry: 'emojiSuggestionsEntry',
    emojiSuggestionsEntryFocused: 'emojiSuggestionsEntryFocused',
    emojiSuggestionsEntryText: 'emojiSuggestionsEntryText',
    emojiSuggestionsEntryIcon: 'emojiSuggestionsEntryIcon',

    emojiSelect: 'emojiSelect',
    emojiSelectButton: 'Btn Btn__emoji Btn__unstyled',
    emojiSelectButtonPressed: 'Btn Btn__emoji Btn__unstyled Btn__emoji--focus',

    emojiSelectPopover: 'emojiSelect__popover',
    emojiSelectPopoverClosed: 'emojiSelectPopoverClosed',
    emojiSelectPopoverTitle: 'emojiSelectPopoverTitle',
    emojiSelectPopoverGroups: 'emojiSelectPopoverGroups',

    emojiSelectPopoverGroup: 'emojiSelectPopoverGroup',
    emojiSelectPopoverGroupTitle: 'emojiSelectPopoverGroupTitle',
    emojiSelectPopoverGroupList: 'emojiSelectPopoverGroupList',
    emojiSelectPopoverGroupItem: 'emojiSelectPopoverGroupItem',

    emojiSelectPopoverToneSelect: 'emojiSelectPopoverToneSelect',
    emojiSelectPopoverToneSelectList: 'emojiSelectPopoverToneSelectList',
    emojiSelectPopoverToneSelectItem: 'emojiSelectPopoverToneSelectItem',

    emojiSelectPopoverEntry: 'emojiSelectPopoverEntry',
    emojiSelectPopoverEntryFocused: 'emojiSelectPopoverEntryFocused',
    emojiSelectPopoverEntryIcon: 'emojiSelectPopoverEntryIcon',

    emojiSelectPopoverNav: 'emojiSelectPopoverNav',
    emojiSelectPopoverNavItem: 'emojiSelectPopoverNavItem',
    emojiSelectPopoverNavEntry: 'emojiSelectPopoverNavEntry',
    emojiSelectPopoverNavEntryActive: 'emojiSelectPopoverNavEntryActive',

    emojiSelectPopoverScrollbar: 'emojiSelectPopoverScrollbar',
    emojiSelectPopoverScrollbarThumb: 'emojiSelectPopoverScrollbarThumb',
  },
  selectButtonContent: <EmojiButtonIcon />,
};

import {
  ContentState,
  EditorState,
  convertFromRaw,
  convertToRaw
} from 'draft-js';

export const createEmptyEditor = () => EditorState.createEmpty();

export const createEditor = content => EditorState.createWithContent(content);

export const clearEditor = (editorState) => {
  const emptyContentState = ContentState.createFromText('');
  return EditorState.push(editorState, emptyContentState, 'remove-range');
};

export const convertForSubmit = (editorState) => {
  const currentContent = editorState.getCurrentContent();
  const messageBody = convertToRaw(currentContent);
  return JSON.stringify(messageBody);
};

export const mountEditorState = (content) => {
  let editorState;

  try {
    const newContentState = convertFromRaw(JSON.parse(content));
    editorState = EditorState.createWithContent(newContentState);
  } catch (errors) {
    editorState = createEmptyEditor();
  }

  return editorState;
};

export const emojiConfig = {
  theme: {
    emoji: 'emoji',
    emojiSuggestions: 'emojiSuggestions',

    emojiSuggestionsEntry: 'emojiSuggestionsEntry',
    emojiSuggestionsEntryFocused: 'emojiSuggestionsEntryFocused',
    emojiSuggestionsEntryText: 'emojiSuggestionsEntryText',
    emojiSuggestionsEntryIcon: 'emojiSuggestionsEntryIcon',

    emojiSelect: 'emoji-select',
    emojiSelectButton: 'btn btn__emoji',
    emojiSelectButtonPressed: 'btn btn__emoji btn__emoji--focus',

    emojiSelectPopover: 'emoji-select__popover',
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
};

import React from 'react';
import MessageEditor from './MessageEditor';
import { mountEditorState, convertForSubmit } from '../util/editorUtil';
import Button from './Button';

class MessageContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = { editorState: mountEditorState(props.content) };
    this.onChange = this.onChange.bind(this);
    this.handleEditClose = this.handleEditClose.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
  }

  onChange(editorState) {
    this.setState({ editorState });
  }

  handleEditClose() {
    const { closeEditor, content } = this.props;
    const initialEditorState = mountEditorState(content);
    this.setState({ editorState: initialEditorState });
    closeEditor();
  }

  handleEditSubmit(event) {
    event.preventDefault();

    const { messageSlug: slug, updateMessageRequest, closeEditor } = this.props;
    const { editorState } = this.state;
    const body = convertForSubmit(editorState);
    updateMessageRequest({ body, slug });
    closeEditor();
  }

  render() {
    const { isEditing } = this.props;
    const { editorState } = this.state;
    const classNames = `msg__editor-container ${isEditing ? 'msg__editor-container--editing' : ''}`;

    return (
      <div className={classNames}>
        <MessageEditor
          editorState={editorState}
          onChange={this.onChange}
          readOnly={!isEditing}
        />
        {isEditing && (
          <div className="msg__actions">
            <Button buttonFor="cancel" onClick={this.handleEditClose}>
              Cancel
            </Button>
            <Button type="submit" buttonFor="submit" onClick={this.handleEditSubmit}>
              Save changes
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default MessageContent;

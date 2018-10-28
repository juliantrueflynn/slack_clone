import React, { Fragment } from 'react';
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

  componentDidUpdate(prevProps) {
    const { content } = this.props;

    if (prevProps.content !== content) {
      this.setEditorState(mountEditorState(content));
    }
  }

  onChange(editorState) {
    this.setEditorState(editorState);
  }

  setEditorState(editorState) {
    this.setState({ editorState });
  }

  handleEditClose() {
    const { closeEditor, content } = this.props;
    const initialEditorState = mountEditorState(content);
    this.setState({ editorState: initialEditorState });
    closeEditor(-1);
  }

  handleEditSubmit(e) {
    e.preventDefault();

    const { messageSlug: slug, updateMessageRequest, closeEditor } = this.props;
    const { editorState } = this.state;
    const body = convertForSubmit(editorState);
    updateMessageRequest({ body, slug });
    closeEditor();
  }

  render() {
    const { isEditing } = this.props;
    const { editorState } = this.state;

    return (
      <Fragment>
        <MessageEditor editorState={editorState} onChange={this.onChange} readOnly={!isEditing} />
        {isEditing && (
          <Fragment>
            <Button buttonFor="cancel" onClick={this.handleEditClose} color="white" size="xs">
              Cancel
            </Button>
            <Button type="submit" buttonFor="submit" onClick={this.handleEditSubmit} color="green" size="xs">
              Save changes
            </Button>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default MessageContent;

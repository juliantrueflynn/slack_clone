import React from 'react';
import { convertForSubmit, clearEditor, createEmptyEditor } from '../../util/editorUtil';
import MessageEditor from '../MessageEditor';
import Button from '../Button';
import Form from '../Form';
import './MessageForm.css';
import Avatar from '../Avatar';

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: createEmptyEditor() };
    this.onChange = this.onChange.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
  }

  onChange(editorState) {
    this.setState({ editorState });
  }

  handleMessageSubmit(event) {
    event.preventDefault();

    const { editorState } = this.state;
    const body = convertForSubmit(editorState);
    const { channelId, parentMessageId, createMessageRequest } = this.props;

    createMessageRequest({ body, channelId, parentMessageId });
    this.setState({ editorState: clearEditor(editorState) });
  }

  render() {
    const { currentUser, parentMessageId, placeholder } = this.props;
    const { editorState } = this.state;

    return (
      <Form formFor="message" onSubmit={this.handleMessageSubmit}>
        {parentMessageId && currentUser && (
          <Avatar author={currentUser} avatarFor="form" />
        )}

        <div className="Form__body">
          <MessageEditor
            editorState={editorState}
            onChange={this.onChange}
            placeholder={placeholder || 'Reply...'}
          />
          <Button type="submit" className="Btn__submit">
            Add Message
          </Button>
        </div>
      </Form>
    );
  }
}

export default MessageForm;

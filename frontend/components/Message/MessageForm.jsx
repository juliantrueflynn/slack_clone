import React from 'react';
import { convertForSubmit, clearEditor, createEmptyEditor } from '../../util/editorUtil';
import MessageEditor from '../MessageEditor';
import Button from '../Button';
import Form from '../Form';
import './MessageForm.css';

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: createEmptyEditor() };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEnterSubmit = this.handleEnterSubmit.bind(this);
  }

  onChange(editorState) {
    this.setState({ editorState });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { editorState } = this.state;
    const body = convertForSubmit(editorState);
    const { channelId, parentMessageId, createMessageRequest } = this.props;

    createMessageRequest({ body, channelId, parentMessageId });
    this.setState({ editorState: clearEditor(editorState) });
  }

  handleEnterSubmit(e) {
    if (e.key === 'Enter' && !e.shiftKey) this.handleSubmit(e);
  }

  render() {
    const { parentMessageId, placeholder } = this.props;
    const { editorState } = this.state;
    let classNames = 'MessageForm MessageForm__';
    classNames += parentMessageId ? 'aside' : 'chat';

    return (
      <div className={classNames}>
        <Form formFor="message" onSubmit={this.handleSubmit} onKeyDown={this.handleEnterSubmit}>
          <div className="Form__body">
            <MessageEditor
              editorState={editorState}
              onChange={this.onChange}
              placeholder={placeholder || 'Reply...'}
            />
            {parentMessageId && (
              <div className="Form__actions">
                <Button type="submit" buttonFor="submit" size="sm">
                  Send
                </Button>
              </div>
            )}
          </div>
        </Form>
      </div>
    );
  }
}

export default MessageForm;

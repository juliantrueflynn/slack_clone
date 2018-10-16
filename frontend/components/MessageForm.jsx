import React from 'react';
import { convertForSubmit, clearEditor, createEmptyEditor } from '../util/editorUtil';
import MessageEditor from './MessageEditor';
import Button from './Button';
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
    const {
      channelId,
      parentMessageId,
      parentMessageSlug,
      createMessageRequest
    } = this.props;

    const message = {
      body,
      channelId,
      parentMessageId,
      parentMessageSlug,
    };

    createMessageRequest(message);
    this.setState({ editorState: clearEditor(editorState) });
  }

  handleEnterSubmit(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      this.handleSubmit(e);
    }
  }

  render() {
    const { placeholder, hasSubmitButton, parentMessageId } = this.props;
    const { editorState } = this.state;
    let classNames = 'MessageForm';
    if (hasSubmitButton) classNames += ' MessageForm__has-submit';
    classNames += parentMessageId ? ' MessageForm__thread' : ' MessageForm__chat';

    return (
      <div className={classNames}>
        <form
          role="presentation"
          onSubmit={this.handleSubmit}
          onKeyDown={this.handleEnterSubmit}
        >
          <div className="Form__body">
            <MessageEditor
              editorState={editorState}
              onChange={this.onChange}
              placeholder={placeholder || 'Reply...'}
            />
            {hasSubmitButton && (
              <div className="Form__actions">
                <Button type="submit" buttonFor="submit" size="sm">
                  Send
                </Button>
              </div>
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default MessageForm;

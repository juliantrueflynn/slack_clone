import React from 'react';
import { convertForSubmit, clearEditor, createEmptyEditor } from '../util/editorUtil';
import Button from './Button';
import withForm from './withForm';
import FormHandler from './FormHandler';
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

  handleSubmit(e) {
    e.preventDefault();

    const { editorState } = this.state;
    const body = convertForSubmit(editorState);
    const {
      channelId,
      parentMessageId,
      parentMessageSlug,
      formDispatchRequest,
    } = this.props;

    const message = {
      body,
      channelId,
      parentMessageId,
      parentMessageSlug,
    };

    formDispatchRequest(message);
    this.setState({ editorState: clearEditor(editorState) });
  }

  handleEnterSubmit(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      this.handleSubmit(e);
    }
  }

  render() {
    const {
      placeholder,
      hasSubmitButton,
      parentMessageId,
      channelId,
    } = this.props;
    const { editorState } = this.state;
    const containerId = parentMessageId || channelId;
    const editorPlaceholder = placeholder || 'Reply...';

    const fields = [{
      id: 'messageForm',
      type: 'editor',
      editorState,
      containerId,
      isNotConvoForm: !parentMessageId,
      onChange: this.onChange,
      placeholder: editorPlaceholder,
    }];

    return (
      <FormHandler
        fields={fields}
        role="presentation"
        onKeyDown={this.handleEnterSubmit}
      >
        {hasSubmitButton && <Button type="submit" buttonFor="submit" size="sm">Send</Button>}
      </FormHandler>
    );
  }
}

const formProps = { type: 'MESSAGE_CREATE_REQUEST', payloadName: 'message' };

export default withForm(formProps)(MessageForm);

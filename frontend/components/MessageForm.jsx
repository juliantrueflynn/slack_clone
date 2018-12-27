import React from 'react';
import { convertForSubmit, clearEditor, createEmptyEditor } from '../util/editorUtil';
import FormContainer from './FormContainer';
import Button from './Button';
import './MessageForm.css';

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = { isActive: false, editorState: createEmptyEditor() };
    this.onChange = this.onChange.bind(this);
    this.handleActiveClick = this.handleActiveClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEnterSubmit = this.handleEnterSubmit.bind(this);
  }

  componentDidMount() {
    const { shouldInitOnClick } = this.props;

    if (!shouldInitOnClick) {
      this.setState({ isActive: true });
    }
  }

  componentDidUpdate(_, prevState) {
    const { isActive } = this.state;

    if (!prevState.isActive && isActive) {
      this.formRef.current.children[0].children[0].children[0].focus();
    }
  }

  onChange(editorState) {
    this.setState({ editorState });
  }

  handleActiveClick() {
    this.setState({ isActive: true });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { editorState } = this.state;
    const body = convertForSubmit(editorState);
    const {
      channelId,
      parentMessageId,
      parentMessageSlug,
      createMessageRequest,
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
    const {
      placeholder,
      hasSubmitButton,
      parentMessageId,
      channelId,
      shouldInitOnClick,
    } = this.props;
    const { isActive } = this.state;
    const editorPlaceholder = placeholder || 'Reply...';

    if (shouldInitOnClick && !isActive) {
      return (
        <div className="MessageForm MessageForm--inactive">
          <Button buttonFor="inactive-editor" onClick={this.handleActiveClick} unStyled>
            {editorPlaceholder}
          </Button>
          <div className="emojiSelect">
            <Button onClick={this.handleActiveClick} buttonFor="emoji" unStyled>☺</Button>
          </div>
        </div>
      );
    }

    const containerId = parentMessageId || channelId;

    const fields = [{
      id: 'messageForm',
      type: 'editor',
      containerId,
      isNotConvoForm: !parentMessageId,
      onChange: this.onChange,
      placeholder: editorPlaceholder,
      shouldInitOnClick,
      ...this.state,
    }];

    return (
      <div className="MessageForm" ref={this.formRef}>
        <FormContainer
          fields={fields}
          role="presentation"
          onKeyDown={this.handleEnterSubmit}
        >
          {hasSubmitButton && <Button type="submit" buttonFor="submit" size="sm">Send</Button>}
        </FormContainer>
      </div>
    );
  }
}

export default MessageForm;

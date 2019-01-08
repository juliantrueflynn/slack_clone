import React from 'react';
import { EditorState } from 'draft-js';
import {
  convertForSubmit,
  clearEditor,
  createEmptyEditor,
  EmojiButtonIcon,
} from '../util/editorUtil';
import Button from './Button';
import MessageEditor from './MessageEditor';
import './MessageForm.css';

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isActive: false, decorator: null, editorState: createEmptyEditor() };
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

  onChange(editorState) {
    const { decorator } = this.state;

    if (editorState.getDecorator()) {
      this.setState({ decorator: editorState.getDecorator(), editorState });
    } else if (decorator) {
      this.setState({ editorState: EditorState.set(editorState, { decorator }) });
    } else {
      this.setState({ editorState });
    }
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
    const { placeholder, hasSubmitButton, shouldInitOnClick } = this.props;
    const { isActive, editorState } = this.state;
    const editorPlaceholder = placeholder || 'Reply...';

    if (shouldInitOnClick && !isActive) {
      return (
        <div className="MessageForm MessageForm--inactive">
          <Button buttonFor="inactive-editor" onClick={this.handleActiveClick} unStyled>
            {editorPlaceholder}
          </Button>
          <div className="emojiSelect">
            <Button onClick={this.handleActiveClick} buttonFor="emoji" unStyled>
              <EmojiButtonIcon />
            </Button>
          </div>
        </div>
      );
    }

    return (
      <form
        role="presentation"
        className="MessageForm"
        onSubmit={this.handleSubmit}
        onKeyDown={this.handleEnterSubmit}
      >
        <MessageEditor
          editorState={editorState}
          onChange={this.onChange}
          placeholder={editorPlaceholder}
        />
        {hasSubmitButton && <Button type="submit" size="sm">Send</Button>}
      </form>
    );
  }
}

export default MessageForm;

import React from 'react';
import { Link } from 'react-router-dom';
import 'draft-js/dist/Draft.css';
import 'draft-js-emoji-plugin/lib/plugin.css';
import Editor from 'draft-js-plugins-editor';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import MessageHoverMenuContainer from '../MessageHoverMenuContainer';
import Reactions from '../Reactions';
import SingleMessageThread from './SingleMessageThread';
import './Message.css';

const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMouseOver: false,
      isEditing: false,
      editorState: null,
    };

    this.onChange = this.onChange.bind(this);
    this.handleEditToggle = this.handleEditToggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // TODO: Change this to memoization helper?
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.message) {
      const body = JSON.parse(nextProps.message.body);
      const blocks = convertFromRaw(body);

      return {
        isMouseOver: prevState.isMouseOver,
        isEditing: prevState.isEditing,
        editorState: EditorState.createWithContent(blocks),
      };
    }

    return null;
  }

  onChange(editorState) {
    this.setState({ editorState });
  }

  handleHoverToggle(isMouseOver) {
    return () => this.setState({ isMouseOver });
  }

  handleEditToggle(toggleResult = false) {
    this.setState({ isEditing: toggleResult });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { editorState } = this.state;
    const currentContent = editorState.getCurrentContent();

    const message = {
      slug: this.props.message.slug,
      body: JSON.stringify(convertToRaw(currentContent)),
    };

    this.props.updateMessageRequest(message);
    this.setState({ isEditing: false });
  }

  render() {
    const { message, ...props } = this.props;
    const { isMouseOver, isEditing, editorState } = this.state;

    if (!message) {
      return null;
    }

    if (isEditing) {
      return (
        <div className="msg">
          <form onSubmit={this.handleSubmit}>
            <Editor
              editorState={editorState}
              onChange={this.onChange}
              plugins={[emojiPlugin]}
            />
            <EmojiSuggestions />
            <EmojiSelect />

            <button className="btn btn__cancel" onClick={this.handleEditToggle}>
              Cancel
            </button>
            <button type="submit" className="btn btn__submit">
              Save changes
            </button>
          </form>
        </div>
      );
    }

    return (
      <div
        className="msg"
        onMouseEnter={this.handleHoverToggle(true)}
        onMouseLeave={this.handleHoverToggle(false)}
      >
        <Link to={`${props.match.url}/team/${message.authorId}`} className="msg__avatar-link">
          <img src="https://via.placeholder.com/40x40" alt={`${message.authorId}'s avatar`} />
        </Link>
        <div className="msg__body">
          {isMouseOver && (
            <MessageHoverMenuContainer
              message={message}
              toggleEditMessage={this.handleEditToggle}
            />
          )}
          <div className="msg__content">
            <div className="msg__content-meta">
              <Link to={`${props.match.url}/team/${message.authorSlug}`} className="msg__author">
                {props.author && props.author.username} (#{message.authorId})
              </Link>
              <span className="msg__time">{message.createdAt}</span>
            </div>
            ID: #{message.id}<br />
            Slug: {message.slug}<br />
            <Editor
              editorState={editorState}
              onChange={this.onChange}
              plugins={[emojiPlugin]}
              readOnly
            />
          </div>
          {(!props.isSingleMessage || message.parentMessageId) && (
            <div className="msg__footer">
              <Reactions reactions={props.reactions} />
              <SingleMessageThread
                message={message}
                match={props.match}
                threadLastUpdate={props.threadLastUpdate}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Message;

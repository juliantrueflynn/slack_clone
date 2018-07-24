import React from 'react';
import { Link } from 'react-router-dom';
import { EditorState, convertFromRaw } from 'draft-js';
import MessageHoverMenuContainer from '../MessageHoverMenuContainer';
import Reactions from '../Reactions';
import MessageEditForm from './MessageEditForm';
import SingleMessageThread from './SingleMessageThread';
import './Message.css';
import MessageEditor from '../../util/editorUtil';

class Message extends React.Component {
  constructor(props) {
    super(props);

    const body = JSON.parse(props.message.body);
    const blocks = convertFromRaw(body);

    this.state = {
      isMouseOver: false,
      isEditing: false,
      editorState: EditorState.createWithContent(blocks),
    };

    this.onChange = this.onChange.bind(this);
    this.handleEditToggle = this.handleEditToggle.bind(this);
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.message.body !== this.props.message.body) {
  //     const newContentState = convertFromRaw(JSON.parse(this.props.message.body));
  //     const editorState = EditorState.push(this.state.editorState, newContentState);
  //     this.onChange(editorState);
  //   }
  // }

  onChange(editorState) {
    this.setState({ editorState });
  }

  handleHoverToggle(isMouseOver) {
    return () => this.setState({ isMouseOver });
  }

  handleEditToggle(toggleResult = false) {
    this.setState({ isEditing: toggleResult });
  }

  render() {
    const { message, ...props } = this.props;
    const { isMouseOver, isEditing, editorState } = this.state;

    if (!message) {
      return null;
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
            {isEditing && (
              <MessageEditForm
                messageSlug={message.slug}
                onChange={this.onChange}
                editorState={editorState}
                handleEditToggle={this.handleEditToggle}
                updateMessageRequest={this.props.updateMessageRequest}
              />
            )}
            {!isEditing && (
              <MessageEditor
                editorState={editorState}
                content={message.body}
                onChange={this.onChange}
                readOnly
              />
            )}
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

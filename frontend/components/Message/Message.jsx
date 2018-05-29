import React from 'react';
import MessageEditForm from './MessageEditForm';
import MessageHoverMenu from './MessageHoverMenu';
import Editor from 'draft-js-plugins-editor';
import { EditorState, convertFromRaw } from 'draft-js';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import 'draft-js/dist/Draft.css';
import 'draft-js-emoji-plugin/lib/plugin.css';

const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

class Message extends React.Component {
  constructor(props) {
    super(props);

    const body = JSON.parse(props.message.body);
    const blocks = convertFromRaw(body);
    this.state = {
      isMouseOver: false,
      isEditing: false,
      editorState: EditorState.createWithContent(blocks)
    };

    this.onChange = editorState => this.setState({ editorState });
  
    this.handleEditToggle = this.handleEditToggle.bind(this);
  }

  handleHoverToggle(isMouseOver) {
    return event => this.setState({ isMouseOver });
  }

  handleEditToggle(toggleResult) {
    this.setState({ isEditing: toggleResult });
  }

  render() {
    const { message } = this.props;
    const { isMouseOver, isEditing } = this.state;
  
    return (
      <li
        className="message"
        onMouseEnter={this.handleHoverToggle(true)}
        onMouseLeave={this.handleHoverToggle(false)}
      >
        <div className="message__body">
          {isEditing && (
            <MessageEditForm
              message={this.props.message}
              toggleEditMessage={this.handleEditToggle}
              updateMessageRequest={this.props.updateMessageRequest}
            />
          )}
          {isMouseOver && !isEditing && (
            <MessageHoverMenu
              message={this.props.message}
              isAuthor={this.props.isAuthor}
              openRightSidebar={this.props.openRightSidebar}
              toggleEditMessage={this.handleEditToggle}
              deleteMessageRequest={this.props.deleteMessageRequest}
              createFavoriteRequest={this.props.createFavoriteRequest}
              deleteFavoriteRequest={this.props.deleteFavoriteRequest}
              isFavorited={this.props.isFavorited}
              match={this.props.match}
            />
          )}
          {!isEditing && (
            <div className="message-body">
              ID: #{this.props.message.id}<br/>
              Slug: {this.props.message.slug}<br/>
              Author: {this.props.message.authorId}<br/>
              <Editor
                editorState={this.state.editorState}
                onChange={this.onChange}
                plugins={[emojiPlugin]}
                readOnly
              />
            </div>
          )}
        </div>
      </li>
    );
  }
}

export default Message;
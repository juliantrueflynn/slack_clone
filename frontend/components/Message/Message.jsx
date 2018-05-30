import React from 'react';
import MessageHoverMenu from './MessageHoverMenu';
import Editor from 'draft-js-plugins-editor';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleHoverToggle(isMouseOver) {
    return event => this.setState({ isMouseOver });
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
    const { message } = this.props;
    const { isMouseOver, isEditing } = this.state;

    if (isEditing) {
      return (
        <li className="message">
          <form onSubmit={this.handleSubmit}>
            <Editor
              editorState={this.state.editorState}
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
        </li>
      );
    }
  
    return (
      <li
        className="message"
        onMouseEnter={this.handleHoverToggle(true)}
        onMouseLeave={this.handleHoverToggle(false)}
      >
        <div className="message__body">
          {isMouseOver && (
            <MessageHoverMenu
              message={message}
              isAuthor={this.props.isAuthor}
              openRightSidebar={this.props.openRightSidebar}
              toggleEditMessage={this.handleEditToggle}
              deleteMessageRequest={this.props.deleteMessageRequest}
              createFavoriteRequest={this.props.createFavoriteRequest}
              deleteFavoriteRequest={this.props.deleteFavoriteRequest}
              isFavorited={this.props.isFavorited}
              createReactionRequest={this.props.createReactionRequest}
              deleteReactionRequest={this.props.deleteReactionRequest}
              match={this.props.match}
            />
          )}
          
          <div className="author">
            Author: {message.authorId}
          </div>
    
          <div className="message-body">
            ID: #{message.id}<br/>
            Slug: {message.slug}<br/>
            
            <Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
              plugins={[emojiPlugin]}
              readOnly
            />
          </div>

          <div className="reactions">
            <ul className="reactions-list">
              {this.props.reactions.map(reaction => (
                <li key={reaction.id}>
                  {reaction.id}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </li>
    );
  }
}

export default Message;
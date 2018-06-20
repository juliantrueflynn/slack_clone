import React from 'react';
import 'draft-js-emoji-plugin/lib/plugin.css';
import 'draft-js/dist/Draft.css';
import Editor from 'draft-js-plugins-editor';
import { EditorState, convertFromRaw } from 'draft-js';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import MessageContainer from './MessageContainer';
import MessageFormContainer from './MessageFormContainer';
import RightSidebarContainer from '../Layout/RightSidebarContainer';

const emojiPlugin = createEmojiPlugin();

class MessageThread extends React.Component {
  constructor(props) {
    super(props);

    if (props.message) {
      const body = JSON.parse(props.message.body);
      const blocks = convertFromRaw(body);
      this.state = { editorState: EditorState.createWithContent(blocks) };
      this.onChange = editorState => this.setState({ editorState });
    }
  }

  componentDidMount() {
    const { openRightSidebar, match: { params } } = this.props;
    const sidebarProps = { messageSlug: params.messageSlug };
    openRightSidebar(sidebarProps);
  }

  componentDidUpdate(prevProps) {
    const { openRightSidebar, match: { params } } = this.props;

    if (params.messageSlug !== prevProps.match.params.messageSlug) {
      const sidebarProps = { messageSlug: params.messageSlug };
      openRightSidebar(sidebarProps);
    }
  }

  render() {
    const { message, threadEntries } = this.props;

    if (!message) {
      return null;
    }

    return (
      <RightSidebarContainer
        sidebarTitle="Thread"
        sidebarSubtitle={`Author: ${message.authorId}`}
        match={this.props.match}
      >
        <div className="thread">
          <div className="thread__message">
            <div>
              ID: {message.id}<br />
              Slug: {message.slug}<br />
              Author: {message.authorId}<br />
              Body:
              <Editor
                editorState={this.state.editorState}
                onChange={this.onChange}
                plugins={[emojiPlugin]}
              />
            </div>
          </div>

          <div className="thread-entries">
            {threadEntries && threadEntries.map(entry => (
              <MessageContainer message={entry} key={entry.slug} />
            ))}
          </div>

          <MessageFormContainer parentMessageId={message.slug} />
        </div>
      </RightSidebarContainer>
    );
  }
}

export default MessageThread;

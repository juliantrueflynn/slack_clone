import React from 'react';
import classNames from 'classnames';
import { isOnSameDay } from '../util/dateUtil';
import ScrollBar from './ScrollBar';
import ChannelBlurb from './ChannelBlurb';
import MessagesListContainer from './MessagesListContainer';
import './ChannelScrollBar.css';

class ChannelScrollBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasHistory: false, lastMessageIndex: 0 };
    this.handleFetchHistory = this.handleFetchHistory.bind(this);
  }

  componentDidMount() {
    this.handleHistory();
    this.updateLastMessageIndex();
  }

  componentDidUpdate(prevProps) {
    const { isLoading, messages } = this.props;

    if (!isLoading.history && prevProps.isLoading.history) {
      this.handleHistory();
    }

    if (messages.length !== prevProps.messages.length) {
      this.updateLastMessageIndex();
    }
  }

  getLastMessage() {
    const { messages } = this.props;
    const { lastMessageIndex } = this.state;
    return messages[lastMessageIndex];
  }

  updateLastMessageIndex() {
    const { messages } = this.props;
    const lastMessageIndex = messages.length - 1;

    this.setState({ lastMessageIndex });
  }

  handleFetchHistory() {
    const { channel, fetchHistoryRequest, messages } = this.props;
    const parents = messages.filter(msg => !msg.parentMessageId);
    const startDate = parents[0] && parents[0].createdAt;

    if (this.shouldFetchHistory() && startDate) {
      fetchHistoryRequest(channel.slug, startDate);
    }
  }

  shouldFetchHistory() {
    const { messages, channel } = this.props;

    const firstMsgDate = messages[0] && messages[0].createdAt;
    const parents = messages.filter(msg => !msg.parentMessageId || msg.entityType === 'entry');

    if (!messages[0] || parents.length < 13) {
      return false;
    }

    return !isOnSameDay(firstMsgDate, channel.createdAt);
  }

  handleHistory() {
    this.setState({ hasHistory: this.shouldFetchHistory() });
  }

  render() {
    const {
      isLoading,
      channel,
      messages,
      updateScrollTop,
      currentUserSlug,
      openModal,
      matchUrl,
      height,
    } = this.props;
    const { hasHistory } = this.state;

    const style = { height };

    const channelScrollBarClasses = classNames('ChannelScrollBar', {
      'ChannelScrollBar--loading': isLoading.history,
    });

    return (
      <div className={channelScrollBarClasses} style={style}>
        <ScrollBar
          fetchHistory={this.handleFetchHistory}
          isLoading={isLoading.history}
          channelScrollLoc={channel.scrollLoc}
          currentUserSlug={currentUserSlug}
          lastMessage={this.getLastMessage()}
          updateScrollTop={updateScrollTop}
          shouldAutoScroll
        >
          {hasHistory || (
            <ChannelBlurb
              channel={channel}
              currentUserSlug={currentUserSlug}
              openModal={openModal}
              matchUrl={matchUrl}
            />
          )}
          <div className="ChannelScrollBar__loader">
            <span className="ChannelScrollBar__loader-txt">Loading...</span>
          </div>
          <MessagesListContainer
            role="listitem"
            messages={messages}
            isDm={channel.hasDm}
            isHighlightable
            isHoverable
          />
        </ScrollBar>
      </div>
    );
  }
}

export default ChannelScrollBar;

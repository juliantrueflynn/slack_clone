import React from 'react';
import classNames from 'classnames';
import ScrollBar from '../ScrollBar';
import ChannelBlurb from '../ChannelBlurb';
import MessagesListContainer from '../../containers/MessagesListContainer';
import withScrollManager from '../../hoc/withScrollManager';
import './styles.css';

class ChannelScrollBar extends React.Component {
  constructor(props) {
    super(props);
    this.blurbRef = React.createRef();
    this.state = { scrollerHeight: 0, hasHistory: false };
    this.handleFetchHistory = this.handleFetchHistory.bind(this);
    this.updateScrollerHeight = this.updateScrollerHeight.bind(this);
    this.updateScrollTo = this.updateScrollTo.bind(this);
    this.prevChannelSlug = null;
  }

  componentDidMount() {
    const {
      chatroom: { slug, scrollLoc },
      scrollTo,
      scrollToBottom,
      currentScrollTop,
    } = this.props;

    this.prevChannelSlug = slug;

    this.updateHasHistory();

    if (scrollLoc || scrollLoc === 0) {
      scrollTo(scrollLoc);
    } else {
      scrollToBottom();
    }

    if (currentScrollTop <= 25) {
      this.handleFetchHistory();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { isFetching, containerRef, isAtTop } = this.props;
    const { hasHistory } = this.state;

    if (isFetching && !prevProps.isFetching) {
      this.updateScrollerHeight(containerRef.current._container.scrollHeight);
    }

    if (!isFetching && prevProps.isFetching) {
      this.updateHasHistory();
      this.updateScrollTo(prevState.scrollerHeight);
    }

    if (!hasHistory && prevState.hasHistory) {
      this.updateScrollTo(prevState.scrollerHeight);
    }

    if (isAtTop && !prevProps.isAtTop) {
      this.handleFetchHistory();
    }
  }

  componentWillUnmount() {
    const { updateScrollLocation, currentScrollTop, isAtBottom } = this.props;

    if (!isAtBottom) {
      updateScrollLocation(this.prevChannelSlug, currentScrollTop());
    }
  }

  updateScrollerHeight(scrollerHeight) {
    this.setState({ scrollerHeight });
  }

  updateHasHistory() {
    const { chatroom: { earliestMessageSlug }, firstMessage } = this.props;
    const { slug } = firstMessage;
    const hasHistory = slug && slug !== earliestMessageSlug;

    this.setState({ hasHistory });
  }

  updateScrollTo(prevScrollerHeight) {
    const { containerRef, scrollTo } = this.props;
    const { scrollHeight } = containerRef.current._container;

    const scrollTop = scrollHeight - prevScrollerHeight;
    const { height: blurbHeight } = this.blurbRef.current.getBoundingClientRect();

    scrollTo(scrollTop + blurbHeight);
  }

  handleFetchHistory() {
    const { fetchHistoryRequest, isFetching, firstMessage } = this.props;
    const { hasHistory } = this.state;

    if (hasHistory && !isFetching) {
      fetchHistoryRequest(firstMessage.id);
    }
  }

  render() {
    const {
      isFetching,
      chatroom,
      messages,
      currentUserSlug,
      openModal,
      containerRef,
      scrollAtTop,
      scrollAtBottom,
      match: { url },
      style,
    } = this.props;
    const { hasHistory } = this.state;

    const classes = classNames('ChannelScrollBar', {
      'ChannelScrollBar--loading': isFetching,
      'ChannelScrollBar--no-history': !hasHistory,
    });

    return (
      <div className={classes}>
        <ScrollBar
          containerRef={containerRef}
          scrollAtTop={scrollAtTop}
          scrollAtBottom={scrollAtBottom}
          style={style}
        >
          <ChannelBlurb
            chatroom={chatroom}
            blurbRef={this.blurbRef}
            currentUserSlug={currentUserSlug}
            openModal={openModal}
            matchUrl={url}
          />
          <div className="ChannelScrollBar__loader">
            <span className="ChannelScrollBar__loader-txt">Loading...</span>
          </div>
          <MessagesListContainer
            role="listitem"
            messages={messages}
            isDm={chatroom.hasDm}
            isHighlightable
            isHoverable
          />
        </ScrollBar>
      </div>
    );
  }
}

export default withScrollManager('Chatroom')(ChannelScrollBar);

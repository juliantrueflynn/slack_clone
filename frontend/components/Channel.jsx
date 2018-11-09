import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import ScrollBar from './ScrollBar';
import ChannelSubscribe from './ChannelSubscribe';
import ChannelBlurb from './ChannelBlurb';
import MessagesList from './MessagesList';
import MessageFormContainer from './MessageFormContainer';

class Channel extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.state = { height: -1 };
    this.handleStylesFromResize = this.handleStylesFromResize.bind(this);
  }

  componentDidMount() {
    this.handleStylesFromResize();
    window.addEventListener('resize', this.handleStylesFromResize);
  }

  componentDidUpdate(prevProps, prevState) {
    const { channel } = this.props;
    const { height } = this.state;

    if (channel.slug !== prevProps.channel.slug) {
      this.handleStylesFromResize();
    }

    if (prevState.height && height !== prevState.height) {
      this.handleStylesFromResize();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleStylesFromResize);
  }

  handleStylesFromResize() {
    const { height: currHeight } = this.state;
    const pageNode = this.container && this.container.current;

    if (!pageNode) {
      return;
    }

    if (pageNode.children[1]) {
      const { clientHeight: bottomNode } = pageNode.children[1];
      const { clientHeight: containerHeight } = pageNode;
      const height = containerHeight - bottomNode;

      if (height !== currHeight) {
        this.setState({ height });
      }
    }
  }

  render() {
    const {
      isLoading,
      channel,
      messages,
      fetchHistoryRequest,
      createChannelSubRequest,
      currentUser,
      modalOpen,
      updateScrollLoc,
      match: { url },
    } = this.props;
    const { height } = this.state;

    const placeholder = channel.hasDm ? `@${channel.title}` : `#${channel.title}`;
    const formPlaceholder = placeholder && `Message ${placeholder}`;
    const style = { height };

    const channelClassNames = classNames('Channel', {
      'Channel--sub': channel.isSub,
      'Channel--unsub': !channel.isSub,
    });

    return (
      <div className={channelClassNames} ref={this.container}>
        <div className="Channel__body" style={style}>
          {isLoading.channel || (
            <ScrollBar
              fetchHistory={fetchHistoryRequest}
              isLoadingHistory={isLoading.history}
              channel={channel}
              messages={messages}
              updateScrollLoc={updateScrollLoc}
              shouldAutoScroll
            >
              <ChannelBlurb
                channel={channel}
                currentUserSlug={currentUser.slug}
                modalOpen={modalOpen}
                matchUrl={url}
              />
              <MessagesList role="listitem" messages={messages} shouldShowPins isDm={channel.hasDm} />
            </ScrollBar>
          )}
        </div>
        {channel.isSub && (
          <MessageFormContainer channelId={channel.id} placeholder={formPlaceholder} />
        )}
        {channel.isSub || channel.hasDm || (
          <ChannelSubscribe
            createChannelSubRequest={createChannelSubRequest}
            matchUrl={url}
            {...channel}
          />
        )}
      </div>
    );
  }
}

export default withRouter(Channel);

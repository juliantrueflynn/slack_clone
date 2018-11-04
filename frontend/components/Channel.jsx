import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import ScrollBar from './ScrollBar';
import ChannelSubscribe from './ChannelSubscribe';
import ChannelBlurb from './ChannelBlurb';
import MessagesList from './MessagesList';
import MessageFormContainer from './MessageFormContainer';
import ChannelEditorModal from './ChannelEditorModal';

class Channel extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.state = { scrollLoc: 0, height: -1 };
    this.handleScrollLoc = this.handleScrollLoc.bind(this);
    this.handleStylesFromResize = this.handleStylesFromResize.bind(this);
  }

  componentDidMount() {
    this.handleStylesFromResize();
    window.addEventListener('resize', this.handleStylesFromResize);
  }

  componentDidUpdate(prevProps) {
    const { chatPath, switchChannel } = this.props;
    const { scrollLoc } = this.state;

    if (chatPath !== prevProps.chatPath) {
      switchChannel(prevProps.chatPath, scrollLoc);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleStylesFromResize);
  }

  handleStylesFromResize() {
    if (!this.container) {
      return;
    }

    const { clientHeight: formHeight } = this.container.current.children[1];
    const { clientHeight: containerHeight } = this.container.current;
    const height = containerHeight - formHeight;

    this.setState({ height });
  }

  handleScrollLoc(scrollLoc) {
    this.setState({ scrollLoc });
  }

  render() {
    const {
      channel,
      messages,
      fetchHistoryRequest,
      createChannelSubRequest,
      currentUser,
      isLoading,
    } = this.props;
    const { height } = this.state;

    const placeholder = channel.hasDm ? `@${channel.title}` : `#${channel.title}`;
    const formPlaceholder = placeholder && `Message ${placeholder}`;

    const channelClassNames = classNames('Channel', {
      'Channel--sub': channel.isSub,
      'Channel--unsub': !channel.isSub,
    });

    const style = { height };

    return (
      <div className={channelClassNames} ref={this.container}>
        <div className="Channel__body" style={style}>
          <ScrollBar>
            <ChannelBlurb channel={channel} currentUserSlug={currentUser.slug} />
            <MessagesList role="listitem" messages={messages} shouldShowPins isDm={channel.hasDm} />
          </ScrollBar>
        </div>
        {channel.isSub && (
          <MessageFormContainer channelId={channel.id} placeholder={formPlaceholder} />
        )}
        <ChannelSubscribe
          channel={channel}
          createChannelSubRequest={createChannelSubRequest}
        />
        <ChannelEditorModal currentUser={currentUser} channel={channel} />
      </div>
    );
  }
}

export default withRouter(Channel);

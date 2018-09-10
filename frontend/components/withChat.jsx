import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { rightSidebarClose } from '../actions/rightSidebarActions';
import EmojiModalContainer from './EmojiModalContainer';
import ChannelHeader from './ChannelHeader';
import { isRightSidebarOpen, selectDmUsernamesBySlug } from '../reducers/selectors';

const withChat = ({ chatTitle, chatClassName }) => (WrappedComponent) => {
  const mapStateToProps = (state, { match: { params: { channelSlug } } }) => ({
    rightSidebar: state.ui.rightSidebar,
    channel: channelSlug ? state.entities.channels[channelSlug] : null,
    isRightSidebarOpen: isRightSidebarOpen(state),
    dmUsernames: selectDmUsernamesBySlug(state, channelSlug, false),
    isWorkspaceLoaded: !!state.ui.displayWorkspaceSlug,
  });

  const mapDispatchToProps = dispatch => ({
    rightSidebarClose: () => dispatch(rightSidebarClose()),
  });

  class WithChat extends React.Component {
    componentDidMount() {
      const { history } = this.props;

      if (this.selectRedirectUrl()) {
        history.push(this.selectRedirectUrl());
      }
    }

    componentDidUpdate(prevProps) {
      const {
        history,
        match: { params: { channelSlug } },
        rightSidebarClose: closeSidebar,
      } = this.props;

      if (this.selectRedirectUrl()) {
        history.push(this.selectRedirectUrl());
      }

      if (!channelSlug && prevProps.match.params.channelSlug) {
        closeSidebar();
      }
    }

    selectRedirectUrl() {
      const {
        rightSidebar,
        match: { url, isExact },
      } = this.props;

      let redirectUrl;
      if (isExact && isRightSidebarOpen) {
        const { sidebarProps } = rightSidebar;

        if (sidebarProps && sidebarProps.path) {
          redirectUrl = url + sidebarProps.path;
        }
      }

      return redirectUrl;
    }

    render() {
      const {
        isReactionModalOpen,
        channel,
        isWorkspaceLoaded,
        rightSidebarClose: closeSidebar,
      } = this.props;

      if (!isWorkspaceLoaded) return null;

      let chatClassNames = 'ChannelPage';
      if (chatClassName) chatClassNames += ` ChannelPage__${chatClassName}`;
      if (isReactionModalOpen) chatClassNames += ' ChannelPage--reaction';

      const chatPageTitle = (channel && `#${channel.title}`) || chatTitle;

      return (
        <div className={chatClassNames}>
          <ChannelHeader sectionTitle={chatPageTitle} rightSidebarClose={closeSidebar} />
          <div className="ChannelPage__body">
            <div className="ChannelPage__row">
              <div className="ChannelPage__container">
                <EmojiModalContainer />
                <WrappedComponent {...this.props} />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(WithChat));
};

export default withChat;

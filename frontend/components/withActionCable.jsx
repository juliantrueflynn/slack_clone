import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ActionCable } from 'react-actioncable-provider';
import { decamelizeKeys, camelizeKeys } from 'humps';
import { selectSubbedChats, selectSubbedWorkspaces } from '../reducers/selectors';
import { createUserAppearance } from '../actions/userAppearanceActions';

const mapStateToProps = state => ({
  isLoggedIn: !!state.session.currentUser,
  subbedWorkspaces: selectSubbedWorkspaces(state),
  subbedChats: selectSubbedChats(state),
});

const mapDispatchToProps = dispatch => ({
  actionCableReceive: received => dispatch(camelizeKeys(received)),
  createUserAppearanceRequest: appearance => dispatch(createUserAppearance.request(appearance)),
});

const withActionCable = (WrappedComponent) => {
  class WithActionCable extends React.Component {
    constructor(props) {
      super(props);
      this.workspaces = React.createRef();
      this.handleReceived = this.handleReceived.bind(this);
      this.handleConnected = this.handleConnected.bind(this);
    }

    handleReceived(received) {
      const { actionCableReceive } = this.props;
      actionCableReceive(received);
    }

    handleConnected() {
      const { createUserAppearanceRequest, match: { params: { workspaceSlug } } } = this.props;
      createUserAppearanceRequest({ workspaceSlug });
    }

    render() {
      const {
        subbedWorkspaces,
        subbedChats,
        isLoggedIn,
        ...props
      } = this.props;
      const { match: { params: { workspaceSlug } } } = props;

      return (
        <Fragment>
          <WrappedComponent {...props} />
          {isLoggedIn && (
            <ActionCable
              channel={{ channel: 'AppChannel' }}
              onReceived={this.handleReceived}
            />
          )}
          {workspaceSlug && (
            <ActionCable
              ref={this.workspaceChat}
              channel={decamelizeKeys({ channel: 'AppearanceChannel', workspaceSlug })}
              onConnected={this.handleConnected}
              onReceived={this.handleReceived}
            />
          )}
          {subbedWorkspaces && subbedWorkspaces.map(({ slug }) => (
            <ActionCable
              key={slug}
              ref={this.workspaces}
              channel={decamelizeKeys({ channel: 'WorkspaceChannel', workspaceSlug: slug })}
              onReceived={this.handleReceived}
            />
          ))}
          {subbedChats && subbedChats.map(({ slug }) => (
            <ActionCable
              key={slug}
              channel={decamelizeKeys({ channel: 'ChatChannel', channelSlug: slug })}
              onReceived={this.handleReceived}
            />
          ))}
        </Fragment>
      );
    }
  }

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(WithActionCable));
};

export default withActionCable;

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ActionCable } from 'react-actioncable-provider';
import { decamelizeKeys, camelizeKeys } from 'humps';
import { selectSubbedChats, selectSubbedWorkspaces } from '../reducers/selectors';
import { createUserAppearance } from '../actions/userAppearanceActions';

const mapStateToProps = (state, { match: { params } }) => ({
  workspaceSlug: params.workspaceSlug,
  isLoggedIn: !!state.session.currentUser,
  subbedWorkspaces: selectSubbedWorkspaces(state),
  subbedChats: selectSubbedChats(state),
  isUsersLoaded: !!Object.values(state.entities.members).length,
});

const mapDispatchToProps = dispatch => ({
  actionCableReceive: received => dispatch(camelizeKeys(received)),
  createUserAppearanceRequest: appearance => dispatch(createUserAppearance.request(appearance)),
});

const withActionCable = (WrappedComponent) => {
  class WithActionCable extends React.Component {
    constructor(props) {
      super(props);
      this.handleReceived = this.handleReceived.bind(this);
    }

    componentDidUpdate(prevProps) {
      const {
        isUsersLoaded,
        createUserAppearanceRequest,
        workspaceSlug,
      } = this.props;

      if (workspaceSlug && isUsersLoaded && !prevProps.isUsersLoaded) {
        createUserAppearanceRequest({ workspaceSlug });
      }
    }

    handleReceived(received) {
      const { actionCableReceive } = this.props;
      actionCableReceive(received);
    }

    render() {
      const {
        workspaceSlug,
        subbedWorkspaces,
        subbedChats,
        isLoggedIn,
        isUsersLoaded,
        ...props
      } = this.props;

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
              channel={decamelizeKeys({ channel: 'AppearanceChannel', workspaceSlug })}
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

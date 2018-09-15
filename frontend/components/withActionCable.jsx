import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ActionCable } from 'react-actioncable-provider';
import { decamelizeKeys, camelizeKeys } from 'humps';
import { selectSubbedChats, selectSubbedWorkspaces } from '../reducers/selectors';
import { destroyUserAppearance } from '../actions/userAppearanceActions';

const mapStateToProps = (state, { match: { params: { workspaceSlug } } }) => ({
  workspaceSlug,
  isLoggedIn: !!state.session.currentUser,
  subbedWorkspaces: selectSubbedWorkspaces(state),
  subbedChats: selectSubbedChats(state),
});

const mapDispatchToProps = dispatch => ({
  actionCableReceive: received => dispatch(camelizeKeys(received)),
  destroyUserAppearanceRequest: appearance => dispatch(destroyUserAppearance.request(appearance)),
});

const withActionCable = (WrappedComponent) => {
  class WithActionCable extends React.Component {
    constructor(props) {
      super(props);
      this.handleReceived = this.handleReceived.bind(this);
    }

    componentDidUpdate(prevProps) {
      const { destroyUserAppearanceRequest, workspaceSlug } = this.props;

      if (prevProps.workspaceSlug && prevProps.workspaceSlug !== workspaceSlug) {
        destroyUserAppearanceRequest(prevProps.workspaceSlug);
      }
    }

    handleReceived(received) {
      const { actionCableReceive } = this.props;
      actionCableReceive(received);
    }

    render() {
      const {
        workspaceSlug,
        destroyUserAppearanceRequest,
        subbedWorkspaces,
        subbedChats,
        isLoggedIn,
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

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ActionCable } from 'react-actioncable-provider';
import { decamelizeKeys, camelizeKeys } from 'humps';
import { selectSubbedWorkspaces } from '../reducers/selectors';
import { destroyUserAppearance } from '../actions/userAppearanceActions';

const mapStateToProps = state => ({
  workspaceSlug: state.ui.displayWorkspaceSlug,
  isLoggedIn: !!state.session.currentUser,
  subbedWorkspaces: selectSubbedWorkspaces(state),
  subbedChats: Object.values(state.entities.channels),
  workspaces: Object.values(state.entities.workspaces),
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
            <Fragment key={slug}>
              <ActionCable
                channel={decamelizeKeys({ channel: 'WorkspaceChannel', workspaceSlug: slug })}
                onReceived={this.handleReceived}
              />
              <ActionCable
                channel={decamelizeKeys({ channel: 'AppearanceChannel', workspaceSlug: slug })}
                onReceived={this.handleReceived}
              />
            </Fragment>
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

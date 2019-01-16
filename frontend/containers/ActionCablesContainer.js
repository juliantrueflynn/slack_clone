import { connect } from 'react-redux';
import ActionCables from '../components/ActionCables';
import { getChatroomsMap } from '../reducers/selectors';

const mapStateToProps = (state) => {
  const chatrooms = Object.values(getChatroomsMap(state));
  const chatroomSlug = state.ui.displayChatroomSlug;
  const workspaceSlug = state.ui.displayWorkspaceSlug;

  const chatroomActionCables = chatrooms.filter(ch => (
    ch.isSub || ch.slug === chatroomSlug
  )).map(ch => (
    { channel: 'ChatroomChannel', chatroomSlug: ch.slug }
  ));

  const actionCables = [
    { channel: 'AppChannel' },
    { channel: 'WorkspaceChannel', workspaceSlug },
    { channel: 'DmUserChannel' },
    { channel: 'AppearanceChannel', workspaceSlug },
    ...chatroomActionCables,
  ];

  return {
    isLoggedIn: !!state.session.currentUser,
    actionCables,
  };
};

const mapDispatchToProps = dispatch => ({
  actionCableReceive: received => dispatch(received),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionCables);

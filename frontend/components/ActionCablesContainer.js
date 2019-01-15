import { connect } from 'react-redux';
import ActionCables from './ActionCables';
import { getChatroomsMap } from '../reducers/selectors';

const mapStateToProps = (state) => {
  const chatrooms = Object.values(getChatroomsMap(state));
  const chatPath = state.ui.displayChatPath;
  const workspaceSlug = state.ui.displayWorkspaceSlug;

  const chatroomActionCables = chatrooms.filter(ch => (
    ch.isSub || ch.slug === chatPath
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

// const withActionCable = (WrappedComponent) => {
//   class WithActionCable extends React.Component {
//     constructor(props) {
//       super(props);
//       this.handleReceived = this.handleReceived.bind(this);
//     }

//     handleReceived(received) {
//       const { actionCableReceive } = this.props;
//       const payload = camelizeKeys(received);
//       actionCableReceive(payload);
//     }

//   }

//   return connect(null, mapDispatchToProps)(WithActionCable);
// };

export default connect(mapStateToProps, mapDispatchToProps)(ActionCables);

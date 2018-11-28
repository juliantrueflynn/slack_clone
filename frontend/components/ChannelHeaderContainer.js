import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  modalOpen,
  drawerClose,
  accordionOpen,
  destroySearch,
} from '../actions/uiActions';
import { destroyChannelSub } from '../actions/channelActions';
import { selectMessages, selectChannelsMap } from '../reducers/selectors';
import ChannelHeader from './ChannelHeader';

const mapStateToProps = (state, { match: { params: { chatPath } } }) => ({
  chatPath,
  channels: selectChannelsMap(state),
  drawerType: state.ui.drawer.drawerType,
  messages: selectMessages(state),
  users: state.entities.members,
  searchQuery: state.ui.searchQuery,
});

const mapDispatchToProps = dispatch => ({
  modalOpen: (modalType, modalProps = null) => dispatch(modalOpen(modalType, modalProps)),
  drawerClose: () => dispatch(drawerClose()),
  accordionOpen: accordionType => dispatch(accordionOpen('details', accordionType)),
  destroySearch: () => dispatch(destroySearch()),
  destroyChannelSubRequest: channelSlug => dispatch(destroyChannelSub.request(channelSlug)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelHeader));

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Unreads from './Unreads';
import { fetchUnreads } from '../actions/readActions';
import { selectUnreadChannels } from '../reducers/selectors';

const mapStateToProps = (state, { match: { params: { workspaceSlug } } }) => ({
  messages: state.entities.messages,
  unreadChannels: selectUnreadChannels(state),
  authors: state.entities.members,
  isWorkspaceLoaded: !!state.ui.displayWorkspaceSlug,
  workspaceSlug,
});

const mapDispatchToProps = dispatch => ({
  fetchUnreadsRequest: workspaceId => dispatch(fetchUnreads.request(workspaceId)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Unreads));

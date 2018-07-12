import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AllUnreadsPage from './AllUnreadsPage';
import { fetchUnreads } from '../actions/readActions';
import { selectWorkspaceIdBySlug, selectUnreadChannels, selectAuthors } from '../reducers/selectors';

const mapStateToProps = (state, { match: { params } }) => ({
  messages: state.entities.messages,
  workspaceId: selectWorkspaceIdBySlug(state, params.workspaceSlug),
  unreadChannels: selectUnreadChannels(state),
  authors: selectAuthors(state),
});

const mapDispatchToProps = dispatch => ({
  fetchUnreadsRequest: workspaceId => dispatch(fetchUnreads.request(workspaceId)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllUnreadsPage));

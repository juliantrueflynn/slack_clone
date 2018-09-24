import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { clearUnreads } from '../actions/unreadActions';
import { selectUnreadChannels } from '../reducers/selectors';
import AllUnreads from './AllUnreads';

const mapStateToProps = (state, { match: { params: { chatPath } } }) => ({
  chatPath,
  unreadChannels: selectUnreadChannels(state),
  messages: state.entities.messages,
  isLoading: state.ui.isPageLoading,
});

const mapDispatchToProps = dispatch => ({
  clearUnreads: channelSlug => dispatch(clearUnreads(channelSlug)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllUnreads));

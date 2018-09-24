import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AllThreads from './AllThreads';

const mapStateToProps = (state, { match: { params: { chatPath } } }) => ({
  chatPath,
  messages: state.entities.messages,
  channels: state.entities.channels,
  currentUser: state.session.currentUser,
  isLoading: state.ui.isPageLoading,
});

export default withRouter(connect(mapStateToProps)(AllThreads));

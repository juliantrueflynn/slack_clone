import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectChannelMessagesBySlug } from '../reducers/selectors';
import { createChannelSub } from '../actions/channelActions';
import Channel from './Channel';

const mapStateToProps = (state, { match: { params: { chatPath } } }) => ({
  chatPath,
  channel: state.entities.channels[chatPath],
  messages: selectChannelMessagesBySlug(state, chatPath),
  currentUser: state.session.currentUser,
  isLoading: state.ui.isPageLoading,
});

const mapDispatchToProps = dispatch => ({
  createChannelSubRequest: channelSub => dispatch(createChannelSub.request(channelSub)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Channel));

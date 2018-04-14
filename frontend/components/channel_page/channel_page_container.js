import { connect } from 'react-redux';
import ChannelPage from './channel_page';
import { loadChannelPage } from '../../actions/channel_actions';

const mapDispatchToProps = dispatch => ({
  loadChannelPage: channelId => dispatch(loadChannelPage(channelId))
});

export default connect(
  null,
  mapDispatchToProps
)(ChannelPage);
import { connect } from 'react-redux';
import ChannelPage from './channel_page';
import { loadChannelPage } from '../../actions/channel_actions';

const mapDispatchToProps = dispatch => ({
  loadChannelPage: (channelId, workspaceId) => dispatch(
    loadChannelPage(channelId, workspaceId)
  )
});

export default connect(
  null,
  mapDispatchToProps
)(ChannelPage);
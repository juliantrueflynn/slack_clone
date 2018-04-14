import { connect } from 'react-redux';
import ChannelsMenu from './channels_menu';
import { requestChannels } from '../../actions/channel_actions';
import { getChannels } from '../../reducers/selectors';

const mapStateToProps = state => ({
  channels: getChannels(state),
});

const mapDispatchToProps = dispatch => ({
  requestChannels: () => dispatch(requestChannels()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelsMenu);
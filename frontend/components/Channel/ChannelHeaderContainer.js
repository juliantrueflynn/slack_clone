import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChannelHeader from './ChannelHeader';
import {
  openRightSidebar,
  closeRightSidebar
} from '../../actions/rightSidebarActions';
import { navigate } from '../../actions/navigateActions';

const mapStateToProps = state => ({
  rightSidebar: state.ui.rightSidebar
});

const mapDispatchToProps = dispatch => ({
  openRightSidebar: () => dispatch(openRightSidebar('Favorites', {})),
  closeRightSidebar: () => dispatch(closeRightSidebar()),
  navigate: path => dispatch(navigate({ path, push: true }))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ChannelHeader)
);
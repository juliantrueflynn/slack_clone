import { connect } from 'react-redux';
import ChannelRightSidebar from './ChannelRightSidebar';
import { closeRightSidebar } from '../../actions/rightSidebarActions';
import { getUserFavorites } from '../../reducers/selectors';
import { navigate } from '../../actions/navigateActions';

const mapStateToProps = state => ({
  rightSidebar: state.ui.rightSidebar,
  isRightSidebarOpen: Boolean(state.ui.rightSidebar),
  favorites: getUserFavorites(state)
});

const mapDispatchToProps = dispatch => ({
  closeRightSidebar: () => dispatch(closeRightSidebar()),
  navigate: path => dispatch(navigate(path))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelRightSidebar);
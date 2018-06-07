import { connect } from 'react-redux';
import RightSidebar from './RightSidebar';
import { closeRightSidebar } from '../../actions/rightSidebarActions';
import { getUserFavorites } from '../../reducers/selectors';
import { navigate } from '../../actions/navigateActions';

const mapStateToProps = state => ({
  isRightSidebarOpen: Boolean(state.ui.rightSidebar)
});

const mapDispatchToProps = dispatch => ({
  closeRightSidebar: () => dispatch(closeRightSidebar()),
  navigate: params => dispatch(navigate(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(RightSidebar);
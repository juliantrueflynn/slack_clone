import { connect } from 'react-redux';
import RightSidebar from './RightSidebar';
import { closeRightSidebar } from '../../actions/interactiveActions';
import { navigate } from '../../actions/interactiveActions';

const mapStateToProps = state => ({
  isRightSidebarOpen: Boolean(state.ui.rightSidebar),
});

const mapDispatchToProps = dispatch => ({
  closeRightSidebar: () => dispatch(closeRightSidebar()),
  navigate: path => dispatch(navigate({ path })),
});

export default connect(mapStateToProps, mapDispatchToProps)(RightSidebar);

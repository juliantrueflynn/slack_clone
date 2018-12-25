import { connect } from 'react-redux';
import { updateDropdown } from '../actions/uiActions';
import DropdownModal from './DropdownModal';

const mapStateToProps = (state, { dropdownType }) => ({
  coordinates: state.ui.dropdown.dropdownProps,
  isDdOpen: state.ui.dropdown.dropdownType === dropdownType,
});

const mapDispatchToProps = dispatch => ({
  close: () => dispatch(updateDropdown(null)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DropdownModal);

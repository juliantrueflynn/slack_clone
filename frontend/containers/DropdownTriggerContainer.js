import { connect } from 'react-redux';
import { updateDropdown } from '../actions/uiActions';
import DropdownTrigger from '../components/DropdownTrigger';

const mapStateToProps = (state, { dropdownType }) => ({
  isDdOpen: state.ui.dropdown.dropdownType === dropdownType,
});

const mapDispatchToProps = (dispatch, { dropdownType }) => ({
  openDropdown: () => dispatch(updateDropdown(dropdownType)),
  closeDropdown: () => dispatch(updateDropdown(null)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DropdownTrigger);

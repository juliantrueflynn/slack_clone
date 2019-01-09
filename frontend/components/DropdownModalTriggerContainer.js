import { connect } from 'react-redux';
import { updateDropdown } from '../actions/uiActions';
import DropdownModalTrigger from './DropdownModalTrigger';

const mapStateToProps = (state, { dropdownType }) => ({
  isDdOpen: state.ui.dropdown.dropdownType === dropdownType,
  dropdownProps: state.ui.dropdown.dropdownProps,
});

const mapDispatchToProps = (dispatch, { dropdownType }) => ({
  openDropdown: dropdownProps => dispatch(updateDropdown(dropdownType, dropdownProps)),
  closeDropdown: () => dispatch(updateDropdown(null)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DropdownModalTrigger);

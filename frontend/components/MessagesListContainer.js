import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  updateMessage,
  deleteMessage,
  createPin,
  destroyPin,
} from '../actions/messageActions';
import { toggleReaction } from '../actions/reactionActions';
import { toggleFavorite } from '../actions/favoriteActions';
import { toggleMessageEditor, updateDropdown } from '../actions/uiActions';
import { getChatPathUrl } from '../reducers/selectors';
import MessagesList from './MessagesList';

const mapStateToProps = state => ({
  currentUserSlug: state.session.currentUser.slug,
  users: state.entities.members,
  reactionsMap: state.entities.reactions,
  pinsMap: state.entities.pins,
  dropdownType: state.ui.dropdown.dropdownType,
  dropdownProps: state.ui.dropdown.dropdownProps,
  isDdOpen: state.ui.dropdown.dropdownType === 'DROPDOWN_MESSAGE',
  chatPathUrl: getChatPathUrl(state),
});

const mapDispatchToProps = dispatch => ({
  updateMessageRequest: message => dispatch(updateMessage.request(message)),
  deleteMessageRequest: messageSlug => dispatch(deleteMessage.request(messageSlug)),
  toggleReaction: reaction => dispatch(toggleReaction(reaction)),
  toggleFavorite: favorite => dispatch(toggleFavorite(favorite)),
  toggleMessageEditor: slug => dispatch(toggleMessageEditor(slug)),
  createPinRequest: pin => dispatch(createPin.request(pin)),
  destroyPinRequest: id => dispatch(destroyPin.request(id)),
  openDropdown: (ddType, ddProps) => dispatch(updateDropdown(ddType, ddProps)),
  closeDropdown: () => dispatch(updateDropdown(null)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MessagesList));

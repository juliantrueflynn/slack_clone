import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateMessage, destroyMessage } from '../actions/messageActions';
import { createPin, destroyPin } from '../actions/pinActions';
import { toggleReaction } from '../actions/reactionActions';
import { toggleFavorite } from '../actions/favoriteActions';
import { toggleMessageEditor, updateDropdown } from '../actions/uiActions';
import { getChatPathUrl } from '../reducers/selectors';
import MessagesList from './MessagesList';

const mapStateToProps = (state) => {
  const { dropdownType: ddType } = state.ui.dropdown;
  const isReactionDdOpen = !!(ddType && ddType.lastIndexOf('DROPDOWN_REACTION', 0) === 0);

  return {
    currentUserSlug: state.session.currentUser.slug,
    usersMap: state.entities.members,
    reactionsMap: state.entities.reactions,
    pinsMap: state.entities.pins,
    isDdOpen: !!ddType,
    isReactionDdOpen,
    chatPathUrl: getChatPathUrl(state),
  };
};

const mapDispatchToProps = dispatch => ({
  updateMessageRequest: message => dispatch(updateMessage.request(message)),
  deleteMessageRequest: messageSlug => dispatch(destroyMessage.request(messageSlug)),
  toggleReaction: reaction => dispatch(toggleReaction(reaction)),
  toggleFavorite: favorite => dispatch(toggleFavorite(favorite)),
  toggleMessageEditor: slug => dispatch(toggleMessageEditor(slug)),
  createPinRequest: pin => dispatch(createPin.request(pin)),
  destroyPinRequest: id => dispatch(destroyPin.request(id)),
  closeDropdown: () => dispatch(updateDropdown(null)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MessagesList));

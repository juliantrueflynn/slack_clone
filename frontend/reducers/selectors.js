import values from 'lodash/values';

export const getWorkspaces = state => (
  values(state.entities.workspaces)
);

export const getPageWorkspaceSlug = state => (
  state.ui.displayWorkspaceSlug
);

export const getChannels = state => (
  values(state.entities.channels)
);

export const getPageChannelSlug = state => (
  state.ui.displayChannelSlug
);

export const getMessages = ({ entities: { messages, channels }, ui }) => {
  const currentChannel = channels[ui.displayChannelSlug];
  
  if (!currentChannel) {
    return [];
  }

  return values(messages).filter(message => 
    !message.parentMessageId && currentChannel.id === message.channelId
  );
};

export const getCurrentMessageBySlug = ({ entities }, messageSlug) => (
  entities.messages[messageSlug] || null
);

export const getMessageSlug = ({ ui: { rightSidebar } }) => (
  rightSidebar && rightSidebar.sidebarType === 'Thread' ?
  rightSidebar.sidebarProps.messageSlug :
  null
);

export const getThread = ({ entities: { messages }, ui: { rightSidebar } }) => {
  if (!rightSidebar || rightSidebar.sidebarType !== 'Thread') {
    return [];
  }

  const messageSlug = rightSidebar.sidebarProps.messageSlug;
  
  if (!messages[messageSlug] || !messageSlug) {
    return [];
  }
  
  return values(messages).filter(message => {
    return message.parentMessageId === messages[messageSlug].id;
  });
};

export const getCurrentUserId = state => (
  state.session.currentUser ? state.session.currentUser.id : null
);

export const getUserFavorites = ({ entities, session }) => (
  Object.values(entities.favorites).filter(fav => (
    session.currentUserId !== fav.userId
  ))
);

export const getFavoriteStatus = (state, messageSlug) => {
  const { entities, session: { currentUser } } = state;

  return Object.values(entities.favorites).some(fav => {
    return fav.messageSlug === messageSlug && fav.userId === currentUser.id;
  });
};

export const getRightSidebarType = state => (
  state.ui.rightSidebar ? state.ui.rightSidebar.sidebarType : null
);

export const getReactionCounts = (state, messageId) => {
  let newReactions = {};
  
  Object.values(state.entities.reactions).forEach(reaction => {
    if (reaction.messageId !== messageId) {
      return;
    }
  
    if (!newReactions[reaction.emoji]) {
      newReactions[reaction.emoji] = [];
    }

    newReactions[reaction.emoji].push(reaction.userId);
  });

  return newReactions;
};
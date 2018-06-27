export const getWorkspaces = state => (
  Object.values(state.entities.workspaces)
);

export const getPageWorkspaceSlug = state => (
  state.ui.displayWorkspaceSlug
);

export const getChannels = state => (
  Object.values(state.entities.channels)
);

export const getPageChannelSlug = state => (
  state.ui.displayChannelSlug
);

export const selectMessages = ({ entities: { channels, messages }, ui }) => {
  const channel = channels[ui.displayChannelSlug];
  const messagesArr = Object.values(messages);

  if (!channel) {
    return [];
  }

  const channelMessages = messagesArr.filter(msg => (msg.thread && channel.id === msg.channelId));

  return channelMessages.sort((a, b) => messages[a.slug].id - messages[b.slug].id);
};

export const getCurrentMessageBySlug = ({ entities }, messageSlug) => (
  entities.messages[messageSlug] || null
);

export const getMessageSlug = ({ ui: { rightSidebar } }) => (
  rightSidebar && rightSidebar.sidebarType === 'Thread' ? rightSidebar.sidebarProps.messageSlug : null
);

export const selectThreadLastUpdate = ({ entities: { messages } }, thread) => {
  if (!thread.length) {
    return null;
  }

  const lastSlug = thread[thread.length - 1];
  return messages[lastSlug] ? messages[lastSlug].createdAt : '';
};

export const selectThreadFromSlug = ({ entities: { messages }, ui: { rightSidebar } }) => {
  if (!rightSidebar || rightSidebar.sidebarType !== 'Thread') {
    return [];
  }

  const { sidebarProps: { messageSlug } } = rightSidebar;
  const parent = messages[messageSlug];

  if (!parent || !parent.thread) {
    return [];
  }

  return parent.thread.map(slug => messages[slug]).filter(msg => msg !== undefined);
};

export const getCurrentUserId = state => (
  state.session.currentUser ? state.session.currentUser.id : null
);

export const getUserFavorites = ({ entities, session }) => (
  Object.values(entities.favorites).filter(favorite => (
    session.currentUserId !== favorite.userId
  ))
);

export const getFavoriteStatus = ({ entities, session: { currentUser } }, messageSlug) => (
  Object.values(entities.favorites).some(fav => (
    fav.messageSlug === messageSlug && fav.userId === currentUser.id
  ))
);

export const getRightSidebarType = state => (
  state.ui.rightSidebar ? state.ui.rightSidebar.sidebarType : null
);

export const getReactionCounts = (state, messageId) => {
  const newReactions = {};

  Object.values(state.entities.reactions).forEach((reaction) => {
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

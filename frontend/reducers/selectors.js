export const getWorkspaces = state => (
  Object.values(state.entities.workspaces)
);

export const selectWorkspaceBySlug = ({ entities: { workspaces }, ui }, slug) => {
  const workspaceSlug = slug || ui.displayWorkspaceSlug;
  return workspaces[workspaceSlug];
};

export const selectWorkspaceIdBySlug = ({ entities: { workspaces }, ui }, slug) => {
  const workspaceSlug = slug || ui.displayWorkspaceSlug;
  return workspaces[workspaceSlug] && workspaces[workspaceSlug].id;
};

export const getPageWorkspaceSlug = state => (
  state.ui.displayWorkspaceSlug
);

export const getChannels = state => (
  Object.values(state.entities.channels)
);

export const selectUnreadChannels = ({ entities: { channels } }) => {
  const unreadChannels = Object.values(channels).filter(ch => ch.hasUnreads);

  return unreadChannels.reduce((acc, curr) => {
    acc[curr.slug] = curr;
    return acc;
  }, {});
};

export const selectChannelIdBySlug = ({ entities: { channels }, ui }, slug) => {
  const channelSlug = slug || ui.displayChannelSlug;
  return channels[channelSlug] && channels[channelSlug].id;
};

export const selectDefaultChannelSlug = ({ entities: { channels } }) => (
  channels && Object.keys(channels)[0]
);

export const selectAuthors = ({ entities: { members, messages } }) => (
  Object.values(messages).reduce((acc, curr) => {
    acc[curr.authorSlug] = members[curr.authorSlug];
    return acc;
  }, {})
);

export const selectParentMessages = ({ entities: { messages, channels }, ui }) => {
  const channel = channels[ui.displayChannelSlug];

  if (!channel) {
    return [];
  }

  const entries = Object.values(messages).filter(msg => (
    msg.thread && channel.id === msg.channelId && !msg.parentMessageId
  ));

  return entries.sort((a, b) => messages[a.slug].id - messages[b.slug].id);
};

export const getCurrentMessageBySlug = ({ entities }, messageSlug) => (
  entities.messages[messageSlug] || null
);

export const selectOpenMessageThreadSlug = ({ ui: { displayMessageSlug } }) => (
  displayMessageSlug || null
);

export const selectThreadLastUpdate = ({ entities: { messages } }, thread) => {
  if (!thread.length) {
    return null;
  }

  const lastSlug = thread[thread.length - 1];
  return messages[lastSlug] ? messages[lastSlug].createdAt : '';
};

export const selectThreadFromSlug = ({ entities: { messages }, ui }, messageSlug) => {
  const parentSlug = messageSlug || ui.displayMessageSlug;
  const parent = messages[parentSlug] || {};
  parent.thread = parent.thread || [];

  return parent.thread.map(slug => messages[slug]).filter(msg => msg);
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

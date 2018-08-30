const values = entities => Object.values(entities);

export const selectWorkspaceIdBySlug = ({ entities: { workspaces }, ui }, slug) => {
  const workspaceSlug = slug || ui.displayWorkspaceSlug;
  return workspaces[workspaceSlug] && workspaces[workspaceSlug].id;
};

export const selectWorkspaces = ({ entities: { workspaces } }) => (
  values(workspaces).sort((a, b) => workspaces[a.slug].id - workspaces[b.slug].id)
);

export const selectWorkspaceSlug = state => state.ui.displayWorkspaceSlug;

export const selectSubbedChats = ({ entities, ui, session: { currentUser } }) => {
  const { channels, members, channelSubs } = entities;
  const { displayChannelSlug: chatSlug } = ui;
  const currMember = members[currentUser.slug];

  if (!currMember || !currMember.subs) return [];

  const chats = currMember.subs.reduce((acc, curr) => {
    const chatSub = channelSubs[curr];
    const channel = channels[chatSub.channelSlug];
    if (chatSub.userSlug !== currentUser.slug || channel.hasDm) return acc;
    acc[chatSub.channelSlug] = channel;
    return acc;
  }, {});

  if (chatSlug && !chats[chatSlug] && channels[chatSlug] && !channels[chatSlug].hasDm) {
    chats[chatSlug] = channels[chatSlug];
  }

  return values(chats).sort((a, b) => a.title.localeCompare(b.title));
};

export const selectUnsubbedChats = ({ entities: { channels, members, channelSubs }, session }) => {
  const { currentUser } = session;
  const currMember = members[currentUser.slug];

  if (!currMember) return [];

  const subbedChatSlugs = currMember.subs.map(subId => channelSubs[subId].channelSlug);
  return values(channels).filter(ch => !subbedChatSlugs.includes(ch.slug) && !ch.hasDm);
};

export const selectChatSubById = ({ entities: { channelSubs } }, id) => (
  channelSubs && channelSubs[id]
);

export const selectDmChats = ({ entities: { channels, channelSubs, members }, session }) => {
  const { currentUser } = session;
  const currMember = members[currentUser.slug];

  if (!currMember || !currMember.subs) return [];

  return currMember.subs
    .map(subId => channelSubs[subId])
    .filter(sub => channels[sub.channelSlug].hasDm && sub.inSidebar)
    .map(sub => channels[sub.channelSlug]);
};

export const selectDmWithUser = ({ entities: { channels } }, userSlug) => {
  const chats = values(channels);
  const dmChatsWithUser = chats.filter(ch => ch.hasDm && ch.members.includes(userSlug));

  return dmChatsWithUser[0];
};

export const selectChannels = ({ entities: { channels } }, workspaceSlug) => (
  values(channels)
    .filter(ch => ch.workspaceSlug === workspaceSlug)
    .sort((a, b) => channels[a.slug].id - channels[b.slug].id)
);

export const selectUnreadChannels = ({ entities: { channels } }) => (
  values(channels).filter(ch => ch.hasUnreads)
);

export const selectChatBySlug = ({ entities: { channels }, ui }, slug) => {
  const chSlug = slug || ui.displayChannelSlug;
  return channels[chSlug];
};

export const selectChatIdBySlug = ({ entities: { channels }, ui }, slug) => {
  const chSlug = slug || ui.displayChannelSlug;
  return channels[chSlug] && channels[chSlug].id;
};

export const selectChatMembers = ({ entities: { members, channels } }) => (
  values(channels)
    .map(ch => ch.members)
    .reduce((acc, curr) => acc.concat(curr), [])
    .filter((userSlug, idx, arr) => arr.indexOf(userSlug) === idx)
    .reduce((acc, curr) => {
      acc[curr] = members[curr];
      return acc;
    }, {})
);

export const selectModalProps = ({ ui: { displayModal } }) => {
  if (!displayModal) return {};
  return displayModal.modalProps;
};

export const isModalOpen = ({ ui: { displayModal: modal } }, type) => (
  modal && modal.modalType && modal.modalType === type
);

export const isUserChatSub = ({ entities, ui, session: { currentUser } }) => {
  const { members, channels } = entities;
  const { displayChannelSlug: chatSlug } = ui;
  const currChat = channels[chatSlug];
  const currMember = members[currentUser.slug];

  let isChatSub = false;

  if (!currMember || !currChat || !currChat.subs) {
    return isChatSub;
  }

  currChat.subs.forEach((subId) => {
    if (!currMember.subs.includes(subId)) return;
    isChatSub = true;
  });

  return isChatSub;
};

export const selectUserBySlug = ({ entities: { members } }, slug) => (
  members && members[slug]
);

export const selectHashDmUsersBySlug = ({ entities, session }, chatSlug, hasCurrUser = true) => {
  const { channels, members } = entities;
  const { currentUser } = session;

  if (!channels[chatSlug] || !channels[chatSlug].members) return null;

  const chatUsers = channels[chatSlug].members.reduce((acc, curr) => {
    acc[curr] = members[curr];
    return acc;
  }, {});

  if (!hasCurrUser) delete chatUsers[currentUser.slug];

  return chatUsers;
};

export const selectDmUsernamesBySlug = (state, chatSlug, hasCurrUser = true) => {
  const dmUsers = selectHashDmUsersBySlug(state, chatSlug, hasCurrUser);
  return dmUsers && values(dmUsers).map(user => user && user.username);
};

export const selectAuthors = ({ entities: { members, messages } }) => (
  values(messages).reduce((acc, curr) => {
    acc[curr.authorSlug] = members[curr.authorSlug];
    return acc;
  }, {})
);

export const selectParentMessages = ({ entities: { messages, channels }, ui }) => {
  const channel = channels[ui.displayChannelSlug];
  return values(messages)
    .filter(msg => (msg.thread && channel && channel.id === msg.channelId && !msg.parentMessageId))
    .sort((a, b) => messages[a.slug].id - messages[b.slug].id);
};

export const selectThreadLastUpdate = ({ entities: { messages } }, thread) => {
  if (!thread.length) return null;
  const lastSlug = thread[thread.length - 1];
  return messages[lastSlug] ? messages[lastSlug].createdAt : '';
};

export const selectThreadFromSlug = ({ entities: { messages }, ui: { displayMessageSlug } }) => {
  const message = messages[displayMessageSlug];
  if (!message || !message.thread) return [];
  return message.thread.map(slug => messages[slug]).filter(msg => msg);
};

export const selectCurrentUser = ({ session: { currentUser } }) => currentUser;

export const selectCurrentUserId = ({ session }) => session.currentUser && session.currentUser.id;

export const selectCurrentUserSlug = ({ session }) => (
  session.currentUser && session.currentUser.slug
);

export const selectReactionByMessageEmoji = (state, { messageId, emoji }) => {
  const { entities: { reactions }, session: { currentUser } } = state;
  const filtered = values(reactions).filter(reaction => (
    reaction.userId === currentUser.id
    && reaction.messageId === messageId
    && reaction.emoji === emoji
  ));

  return !filtered.length ? null : filtered[0];
};

export const getReactionCounts = ({ entities: { reactions } }, messageId) => (
  values(reactions)
    .filter(reaction => reaction.messageId === messageId)
    .reduce((acc, { emoji, userId }) => {
      if (!acc[emoji]) acc[emoji] = [userId];
      if (!acc[emoji].includes(userId)) acc[emoji].push(userId);
      return acc;
    }, {})
);

const values = entities => Object.values(entities);

export const selectWorkspaces = ({ entities: { workspaces } }) => (
  values(workspaces).sort((a, b) => workspaces[a.slug].id - workspaces[b.slug].id)
);

export const selectSubbedWorkspaces = ({ entities: { workspaces }, session: { currentUser } }) => (
  values(workspaces).filter(workspace => workspace.members.includes(currentUser.slug))
);

export const selectSubbedChats = ({ entities: { channels }, session: { currentUser } }) => (
  values(channels)
    .filter(ch => ch.members.includes(currentUser.slug))
    .sort((a, b) => a.title && a.title.localeCompare(b.title))
);

export const isRightSidebarOpen = ({ ui }) => !!values(ui.rightSidebar).length;

export const selectUnsubbedChats = ({ entities: { channels }, session: { currentUser } }) => (
  values(channels).filter(ch => !ch.members.includes(currentUser.slug) && !ch.hasDm)
);

export const selectOtherDmSub = ({ entities: { channelSubs }, session }, chatSubs) => {
  const { currentUser: { id: userId } } = session;
  const otherUserSubId = chatSubs.filter(subId => (
    channelSubs[subId] && channelSubs[subId].userId !== userId
  ));

  return otherUserSubId.length ? channelSubs[otherUserSubId[0]] : null;
};

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

export const selectChannels = ({ entities: { channels } }, workspaceSlug) => (
  values(channels)
    .filter(ch => ch.workspaceSlug === workspaceSlug)
    .sort((a, b) => channels[a.slug].id - channels[b.slug].id)
);

export const selectChatBySlug = ({ entities: { channels }, ui }, slug) => {
  const chSlug = slug || ui.displayChannelSlug;
  return channels[chSlug] || null;
};

export const selectChatTitleBySlug = ({ entities: { channels, members }, session }, slug) => {
  let chatTitle;
  if (slug === 'unreads') {
    chatTitle = 'All Unreads';
  } else if (slug === 'threads') {
    chatTitle = 'All Threads';
  } else if (channels[slug]) {
    chatTitle = `#${channels[slug].title}`;

    if (channels[slug].hasDm) {
      const { currentUser: { slug: userSlug } } = session;
      const dmUsers = channels[slug].members.filter(member => member !== userSlug);
      const dmWith = dmUsers[0];
      chatTitle = members[dmWith] && members[dmWith].username;
    }
  }

  return chatTitle;
};

export const selectModalProps = ({ ui: { displayModal } }) => {
  if (!displayModal) return {};
  return displayModal.modalProps;
};

export const isModalOpen = ({ ui: { displayModal: modal } }, type) => (
  modal && modal.modalType && modal.modalType === type
);

export const selectUserBySlug = ({ entities: { members } }, slug) => (
  members && members[slug]
);

export const selectThreadLastUpdate = ({ entities: { messages } }, thread) => {
  if (!thread.length) return null;
  const lastSlug = thread[thread.length - 1];
  return messages[lastSlug] ? messages[lastSlug].createdAt : '';
};

export const selectMessageBySlug = ({ entities: { messages }, ui }, slug) => (
  messages[slug || ui.displayMessageSlug]
);

export const selectThreadFromSlug = ({ entities: { messages }, ui }, messageSlug) => {
  const msgSlug = messageSlug || ui.displayMessageSlug;
  const message = messages[msgSlug];

  if (!message || !message.thread) return [];

  return message.thread.reduce((acc, curr) => {
    acc.push(messages[curr]);
    return acc;
  }, [message]);
};

export const selectThreadMembers = (state, messageSlug) => {
  const thread = selectThreadFromSlug(state, messageSlug);

  if (!thread) return [];

  const { entities: { members } } = state;
  return thread.map(msg => members[msg.authorSlug])
    .filter((user, i, self) => self.indexOf(user) === i);
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

export const getReactionCounts = ({ entities: { reactions }, session }, messageSlug) => {
  const { currentUser } = session;

  return values(reactions)
    .filter(reaction => reaction.messageSlug === messageSlug)
    .reduce((acc, { emoji, userId }) => {
      if (!acc[emoji]) acc[emoji] = { users: [] };
      acc[emoji].users.push(userId);
      acc[emoji].hasCurrentUser = userId === currentUser.id;

      return acc;
    }, {});
};

export const selectCurrentMessage = ({ entities: { messages }, ui }) => (
  messages[ui.displayMessageSlug]
);

export const selectChatMessages = ({ entities: { channels, messages } }, chatPath) => {
  const chat = channels[chatPath];

  if (chat) {
    return values(messages)
      .filter(msg => (msg.thread && chat && chat.id === msg.channelId && !msg.parentMessageId))
      .sort((a, b) => messages[a.slug].id - messages[b.slug].id);
  }

  return messages;
};

export const selectChatChannels = ({ entities: { channels } }, chatPath) => {
  if (chatPath === 'unreads') {
    return channels;
  }

  return values(channels);
};

export const selectCurrentChannel = ({ entities: { channels }, ui }) => (
  channels[ui.displayChannelSlug]
);

export const hasUreadChannels = ({ entities: { reads, channels } }) => (
  !!values(reads).filter(read => read.readableType === 'Channel' && channels[read.slug].hasUnreads).length
);

export const hasUreadThreads = ({ entities: { reads, messages } }) => (
  !!values(reads).filter(read => (
    read.readableType === 'Message' && messages[read.slug] && messages[read.slug].hasUnreads
  )).length
);

export const selectEntities = ({ entities }, entityName) => entities[entityName];

export const selectEntityBySlug = ({ entities }, entityName, slug) => (
  entities[entityName] && entities[entityName][slug]
);

export const selectUIByDisplay = ({ ui }, display) => ui[display];

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

export const selectMessageChildren = ({ entities: { messages } }, thread) => {
  if (!thread) return [];
  return thread.map(slug => messages[slug]);
};

export const selectCurrentUser = ({ session: { currentUser } }) => currentUser;

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

export const selectChannelMessagesBySlug = ({ entities: { messages, channels } }, chatSlug) => {
  const chat = channels[chatSlug];

  return chat && values(messages)
    .filter(msg => (chat.id === msg.channelId && !msg.parentMessageId))
    .sort((a, b) => messages[a.slug].id - messages[b.slug].id);
};

export const selectUnreadChannels = ({ entities: { channels } }) => (
  values(channels).filter(ch => ch.hasUnreads && !ch.hasDm)
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

const values = entities => Object.values(entities);

export const selectWorkspaceIdBySlug = ({ entities: { workspaces }, ui }, slug) => {
  const workspaceSlug = slug || ui.displayWorkspaceSlug;
  return workspaces[workspaceSlug] && workspaces[workspaceSlug].id;
};

export const selectWorkspaceSlug = state => state.ui.displayWorkspaceSlug;

export const selectSubbedChats = ({ entities: { channels, members, channelSubs }, session }) => {
  const { currentUser } = session;
  const currMember = members[currentUser.slug];

  if (!currMember || !currMember.subs) return [];

  const chats = currMember.subs.reduce((acc, curr) => {
    const chatSub = channelSubs[curr];
    const channel = channels[chatSub.channelSlug];
    if (chatSub.userSlug !== currentUser.slug || channel.hasDm) return acc;
    acc[chatSub.channelSlug] = channel;
    return acc;
  }, {});

  return values(chats);
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

const hasDmWithUser = ({ hasDm, members }, userSlug) => (
  !!hasDm && members && members.includes(userSlug)
);

export const selectDmChats = ({ entities: { channels, channelSubs, members }, session }) => {
  const { currentUser } = session;
  const currMember = members[currentUser.slug];

  if (!currMember || !currMember.subs) return [];

  const subIds = values(channels).filter(ch => ch.hasDm).map(ch => ch.subs);
  const flatten = subIds.reduce((acc, curr) => acc.concat(curr), []);
  const subs = flatten.filter(id => !currMember.subs.includes(id) && channelSubs[id].inSidebar);
  const chatSubs = subs.map(sub => channelSubs[sub]);

  const subsFilter = chatSubs.filter(({ channelSlug, inSidebar }) => (
    channels[channelSlug].hasDm && inSidebar
  ));

  return subsFilter.map(sub => channels[sub.channelSlug]);
};

export const selectDmWithUser = ({ entities: { channels } }, userSlug) => (
  values(channels).filter(ch => (
    hasDmWithUser(ch, userSlug)
  ))[0]
);

export const selectChannels = ({ entities: { channels } }, workspaceSlug) => (
  values(channels).filter(ch => ch.workspaceSlug === workspaceSlug)
);

export const selectUnreadChannels = ({ entities: { channels } }) => (
  values(channels)
    .filter(ch => ch.hasUnreads)
    .reduce((acc, curr) => {
      acc[curr.slug] = curr;
      return acc;
    }, {})
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

export const selectThreadFromSlug = ({ entities: { messages }, ui: { displayMessageSlug } }) => (
  messages[displayMessageSlug]
  && messages[displayMessageSlug].thread
  && messages[displayMessageSlug].thread.map(slug => messages[slug]).filter(msg => msg)
);

export const selectCurrentUser = ({ session: { currentUser } }) => currentUser;

export const selectCurrentUserId = ({ session }) => session.currentUser && session.currentUser.id;

export const selectCurrentUserSlug = ({ session }) => (
  session.currentUser && session.currentUser.slug
);

export const getReactionCounts = ({ entities: { reactions } }, messageId) => (
  values(reactions)
    .filter(reaction => reaction.messageId === messageId)
    .reduce((acc, { emoji, userId }) => {
      if (!acc[emoji]) acc[emoji] = [userId];
      if (!acc[emoji].includes(userId)) acc[emoji].push(userId);
      return acc;
    }, {})
);

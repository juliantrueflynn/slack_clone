const values = entities => Object.values(entities);

export const selectWorkspaces = ({ entities: { workspaces } }) => (
  values(workspaces).sort((a, b) => workspaces[a.slug].id - workspaces[b.slug].id)
);

export const selectSubbedWorkspaces = ({ entities: { workspaces }, session: { currentUser } }) => (
  values(workspaces).filter(workspace => workspace.members.includes(currentUser.slug))
);

export const selectDrawerPath = ({ ui: { drawer } }) => {
  const { drawerType, drawerSlug } = drawer;

  if (drawerSlug) {
    return `/${drawerType}/${drawerSlug}`;
  }

  return `/${drawerType}`;
};

export const selectUnsubbedChats = ({ entities: { channels }, session: { currentUser } }) => (
  values(channels).filter(ch => !ch.members.includes(currentUser.slug) && !ch.hasDm)
);

const selectDmWith = (channel, members, currUserSlug) => {
  const dmWith = channel.members.filter(userSlug => userSlug !== currUserSlug);
  return dmWith[0] && members[dmWith[0]];
};

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
    .map(({ channelSlug }) => {
      const channel = Object.assign({}, channels[channelSlug]);
      const dmUser = selectDmWith(channel, members, currMember.slug);

      if (dmUser) {
        channel.title = dmUser.username;
        channel.userStatus = dmUser.status;
      }

      return channel;
    });
};

export const selectChatTitleBySlug = ({ entities: { channels, members }, ui, session }, slug) => {
  const chatPath = slug || ui.displayChannelSlug;

  let chatTitle;
  if (chatPath === 'unreads') {
    chatTitle = 'All Unreads';
  }

  if (chatPath === 'threads') {
    chatTitle = 'All Threads';
  }

  const channel = channels[chatPath];
  if (channels[chatPath]) {
    const { currentUser } = session;
    chatTitle = channel.title;

    if (channel.hasDm) {
      const dmUser = selectDmWith(channel, members, currentUser.slug);
      chatTitle = dmUser && dmUser.username;
    }
  }

  return chatTitle;
};

export const selectSubbedChats = ({ entities: { channels }, session: { currentUser } }) => (
  values(channels)
    .filter(ch => ch.members.includes(currentUser.slug))
    .sort((a, b) => a.title && a.title.localeCompare(b.title))
);

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

const messageWithEntities = (message, members) => {
  const author = members[message.authorSlug];
  return {
    authorName: author && author.username,
    ...message,
  };
};

const selectMessagesFavorites = ({ favorites, messages, members }) => (
  values(favorites).map(({ messageSlug }) => (
    messageWithEntities(messages[messageSlug], members)
  ))
);

export const selectChatMessagesBySlug = ({ entities }, chatSlug) => {
  const { messages, channels, members } = entities;
  const chat = channels[chatSlug];

  if (chat) {
    return values(messages)
      .map(message => messageWithEntities(message, members))
      .filter(msg => (chat.id === msg.channelId && !msg.parentMessageId))
      .sort((a, b) => messages[a.slug].id - messages[b.slug].id);
  }

  return messages;
};

const selectMessageThreadBySlug = ({ messages, members }, slug) => {
  const message = messages[slug];

  if (!message || !message.thread) {
    return [];
  }

  const messageThread = message.thread.reduce((acc, curr) => {
    acc.push(messages[curr]);
    return acc;
  }, [message]);

  return messageThread.map(entry => messageWithEntities(entry, members));
};

export const selectDrawerMessagesByType = ({ entities, ui: { drawer } }) => {
  const { drawerType, drawerSlug } = drawer;

  if (drawerType === 'favorites') {
    return selectMessagesFavorites(entities);
  }

  if (drawerType === 'thread') {
    return selectMessageThreadBySlug(entities, drawerSlug);
  }

  return [];
};

export const selectMessageChildrenBySlug = ({ entities }, slug) => (
  selectMessageThreadBySlug(entities, slug).slice(1)
);

export const selectChatChannelsBySlug = ({ entities: { channels } }, chatSlug) => {
  if (chatSlug === 'unreads') {
    return values(channels).filter(ch => ch.hasUnreads && !ch.hasDm);
  }

  return channels;
};

export const hasUreadChannels = ({ entities: { channels } }) => (
  values(channels).some(ch => ch.hasUnreads && !ch.hasDm)
);

export const hasUreadThreads = ({ entities: { messages } }) => (
  values(messages).some(message => message.hasUnreads)
);

export const selectEntities = ({ entities }, entityName) => entities[entityName];

export const selectEntityBySlug = ({ entities }, entityName, slug) => (
  entities[entityName] && entities[entityName][slug]
);

export const selectUIByDisplay = ({ ui }, display) => ui[display];

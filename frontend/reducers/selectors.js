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

const selectDmWithUser = (channel, members, currUserSlug) => {
  const dmWith = channel.members.filter(userSlug => userSlug !== currUserSlug);
  return dmWith[0] && members[dmWith[0]];
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
      const dmUser = selectDmWithUser(channel, members, currMember.slug);
      const subs = channel.subs.filter(id => channelSubs[id].userId === currMember.id);
      const [subId] = subs;

      if (dmUser) {
        channel.title = dmUser.username;
        channel.userStatus = dmUser.status;
      }

      if (subId) {
        channel.userSubId = subId;
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
      const dmUser = selectDmWithUser(channel, members, currentUser.slug);
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

const messagesWithEntitiesMap = ({ messages, members }) => (
  values(messages).reduce((acc, curr) => {
    const author = members[curr.authorSlug];

    acc[curr.slug] = {
      authorName: author && author.username,
      ...curr,
    };

    return acc;
  }, {})
);

const selectMessagesFavorites = ({ favorites, messages, members }) => {
  const entries = messagesWithEntitiesMap({ messages, members });
  return values(favorites).map(({ messageSlug }) => entries[messageSlug]);
};

const selectMessageThreadBySlug = ({ messages, members }, slug) => {
  const entries = messagesWithEntitiesMap({ messages, members });
  const message = entries[slug];

  if (!message || !message.thread) {
    return [];
  }

  return message.thread.reduce((acc, curr) => {
    acc.push(entries[curr]);
    return acc;
  }, [message]);
};

export const selectMessageChildrenBySlug = ({ entities }, slug) => (
  selectMessageThreadBySlug(entities, slug).slice(1)
);

export const selectChatMessagesBySlug = ({ entities }, chatSlug) => {
  const { messages, channels, members } = entities;
  const entries = messagesWithEntitiesMap({ messages, members });

  const chat = channels[chatSlug];
  if (chat) {
    return values(entries)
      .filter(msg => (chat.id === msg.channelId && !msg.parentMessageId))
      .sort((a, b) => entries[a.slug].id - entries[b.slug].id);
  }

  if (chatSlug === 'threads') {
    const convos = values(entries).filter(message => message.isActiveThread).reverse();

    return convos.reduce((acc, curr) => {
      const convo = Object.assign({}, curr);
      convo.thread = selectMessageChildrenBySlug({ entities }, curr.slug);
      acc.push(convo);
      return acc;
    }, []);
  }

  return entries;
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

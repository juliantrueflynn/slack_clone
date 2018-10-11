const values = entities => Object.values(entities);

export const selectCurrentUser = ({ session: { currentUser } }) => currentUser;

export const selectWorkspaces = ({ entities: { workspaces } }) => (
  values(workspaces).sort((a, b) => a.id - b.id)
);

export const selectSubbedWorkspaces = ({ entities: { workspaces } }) => (
  values(workspaces).filter(({ isSub, isMember }) => isSub && isMember)
);

const selectDmWithUser = (channel, members, currUserSlug) => {
  const dmWith = channel.members.filter(userSlug => userSlug !== currUserSlug);
  return dmWith[0] && members[dmWith[0]];
};

export const selectDmChats = ({ entities: { channels, channelSubs, members }, session }) => {
  const { currentUser } = session;
  const currMember = members[currentUser.slug];

  if (!currMember || !currMember.subs) {
    return [];
  }

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

export const selectSubbedChats = ({ entities: { channels }, session: { currentUser } }) => (
  values(channels)
    .filter(ch => ch.members.includes(currentUser.slug))
    .sort((a, b) => a.title && a.title.localeCompare(b.title))
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
    .reduce((acc, curr) => {
      if (!acc[curr.emoji]) {
        acc[curr.emoji] = { users: [] };
      }

      acc[curr.emoji].users.push(curr.userId);
      acc[curr.emoji].hasCurrentUser = curr.userId === currentUser.id;

      return acc;
    }, {});
};

const messagesWithEntitiesMap = ({ messages, members }) => (
  values(messages).reduce((acc, curr) => {
    const message = messages[curr.slug];
    const author = members && members[curr.authorSlug];

    if (author) {
      message.authorName = author.username;
    }

    acc[curr.slug] = message;

    return acc;
  }, {})
);

const selectMessagesFavorites = ({ favorites, messages, members }) => {
  const entries = messagesWithEntitiesMap({ messages, members });

  return values(favorites)
    .map(({ messageSlug }) => entries[messageSlug])
    .filter(message => message.isInDrawer);
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

const selectAllThreadMessages = (entities) => {
  const entries = messagesWithEntitiesMap(entities);

  return values(entries)
    .filter(message => message.isInConvo)
    .reduce((acc, curr) => {
      const convo = Object.assign({}, curr);
      convo.thread = selectMessageChildrenBySlug({ entities }, curr.slug);
      acc.push(convo);
      return acc;
    }, [])
    .sort((a, b) => new Date(b.lastActive) - new Date(a.lastActive));
};

const groupByEntityInIndex = (arr) => {
  const entries = [];

  for (let idx = 0; idx < arr.length; idx += 1) {
    entries.push(arr[idx]);

    if (arr[idx].entityType !== 'entry') {
      for (let i = idx; i < arr.length; i += 1) {
        if (!arr[i + 1] || arr[i + 1].entityType === 'entry') {
          idx = i;
          break;
        }

        entries[entries.length - 1].group.push(arr[i + 1]);
      }
    }
  }

  return entries;
};

const selectChannelMessagesBySlug = ({ entities }, slug) => {
  const { channels } = entities;
  const channel = channels[slug];
  const entries = messagesWithEntitiesMap(entities);
  const allMessages = values(entries).filter(msg => (
    msg && msg.channelId && msg.channelId === channel.id && !msg.parentMessageId
  ));
  const messages = allMessages.filter(msg => msg.entityType === 'entry');
  const subMessages = allMessages.filter(msg => msg.entityType !== 'entry').reduce((acc, curr) => {
    const message = entries[curr.slug];
    message.group = [];
    message.channelTitle = `#${channel.title}`;
    acc.push(message);
    return acc;
  }, []);

  const items = [...subMessages, ...messages].sort((a, b) => a.id - b.id);

  return groupByEntityInIndex(items);
};

export const selectChatPageMessagesBySlug = ({ entities }, slug) => {
  const { messages, channels, members } = entities;
  const entries = messagesWithEntitiesMap({ messages, members });

  if (channels[slug]) {
    return selectChannelMessagesBySlug({ entities }, slug);
  }

  if (slug === 'threads') {
    return selectAllThreadMessages(entities);
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

const channelsWithEntitiesMap = ({ channels, members }, currentUserSlug) => (
  values(channels).reduce((acc, curr) => {
    const channel = channels[curr.slug];
    if (!channel.isSub) {
      channel.isSub = channel.members.includes(currentUserSlug);
    }

    if (channel && channel.hasDm) {
      const dmUser = selectDmWithUser(channel, members, currentUserSlug);

      if (dmUser) {
        channel.title = dmUser.username;
        channel.dmUserSlug = dmUser.slug;
      }
    }

    if (channel && !channel.hasDm) {
      const owner = members[channel.ownerSlug];
      channel.ownerName = owner && owner.username;
    }

    acc[curr.slug] = channel;

    return acc;
  }, {})
);

export const selectChannelsWithEntitiesMap = ({ entities, session: { currentUser } }) => (
  channelsWithEntitiesMap(entities, currentUser.slug)
);

const selectThreadChannels = channels => (
  values(channels).filter(ch => !ch.hasDm).reduce((acc, curr) => {
    acc[curr.slug] = channels[curr.slug];
    return acc;
  }, {})
);

export const selectChatPageChannelsBySlug = ({ entities, session: { currentUser } }, slug) => {
  const { channels, members } = entities;

  if (slug === 'unreads') {
    return values(channels).filter(ch => ch.hasUnreads && !ch.hasDm);
  }

  if (slug === 'threads') {
    return selectThreadChannels(channels);
  }

  return channelsWithEntitiesMap({ channels, members }, currentUser.slug);
};

export const selectEntities = ({ entities }, type) => entities[type];

export const selectEntityBySlug = ({ entities }, type, slug) => entities[type][slug];

export const selectUIByDisplay = ({ ui }, display) => ui[display];

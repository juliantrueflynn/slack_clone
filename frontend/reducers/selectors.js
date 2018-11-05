const values = entities => Object.values(entities);

export const selectCurrentUser = ({ session: { currentUser } }) => currentUser;

export const selectSubbedWorkspaces = ({ entities: { workspaces } }) => (
  values(workspaces).filter(({ isSub, isMember }) => isSub && isMember).sort((a, b) => a.id - b.id)
);

export const messagesWithEntitiesMap = ({ messages, members, channels }, userSlug) => (
  values(messages).reduce((acc, curr) => {
    const message = messages[curr.slug];

    if (!message) {
      return acc;
    }

    if (userSlug) {
      message.isCurrentUser = userSlug === message.authorSlug;
    }

    if (message.thread && message.thread.length) {
      const lastMsg = messages[message.thread.length - 1];
      message.lastMessageDate = lastMsg && lastMsg.createdAt;
    }

    if (channels) {
      const channel = channels[message.channelSlug];
      message.channelTitle = channel && channel.title;
    }

    const author = members && members[curr.authorSlug];

    acc[curr.slug] = {
      authorName: author && author.username,
      avatarThumb: author && author.avatarThumb,
      ...message,
    };

    return acc;
  }, {})
);

export const selectMessagesWithEntities = ({ entities, session: { currentUser } }) => (
  values(messagesWithEntitiesMap(entities, currentUser.slug))
);

export const selectSearchMessages = ({ entities, session: { currentUser } }) => {
  const { channels } = entities;
  const entries = messagesWithEntitiesMap(entities, currentUser.slug);

  return values(entries).map((message) => {
    const entry = Object.assign({}, message);
    const channel = channels[message.channelSlug];
    entry.thread = entry.thread && entry.thread.length;
    entry.channelTitle = channel && channel.title;

    return entry;
  }).filter(message => message.isInSearch).sort((a, b) => b.id - a.id);
};

const selectMessageThreadBySlug = (entities, slug) => {
  const entries = messagesWithEntitiesMap(entities);
  const message = entries[slug];

  if (!message || !message.thread) {
    return [];
  }

  return message.thread.reduce((acc, curr) => {
    acc.push(entries[curr]);
    return acc;
  }, [message]);
};

const selectAllThreadMessages = (entities) => {
  const entries = messagesWithEntitiesMap(entities);

  return values(entries)
    .filter(message => message.isInConvo)
    .reduce((acc, curr) => {
      const convo = Object.assign({}, curr);
      convo.thread = selectMessageThreadBySlug(entities, curr.slug).slice(1);
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

export const selectChatPageMessagesBySlug = ({ entities, session: { currentUser } }, slug) => {
  if (slug === 'unreads') {
    return messagesWithEntitiesMap(entities, currentUser.slug);
  }

  if (slug === 'threads') {
    return selectAllThreadMessages(entities);
  }

  return selectChannelMessagesBySlug({ entities }, slug);
};

const selectMessagesFavorites = ({ favorites, ...entities }) => {
  const entries = messagesWithEntitiesMap(entities);

  return values(favorites)
    .map(({ messageSlug }) => entries[messageSlug])
    .filter(message => message.isInDrawer && message.entityType === 'entry');
};

const selectPinnedMessagesBySlug = (entities, chatSlug) => {
  const messages = messagesWithEntitiesMap(entities);
  return values(messages).filter(msg => msg.pinId && msg.channelSlug === chatSlug);
};

export const selectDrawerMessages = ({ entities, ui: { displayChannelSlug, drawer } }) => {
  const { drawerType, drawerSlug } = drawer;

  if (drawerType === 'favorites') {
    return selectMessagesFavorites(entities);
  }

  if (drawerType === 'convo') {
    return selectMessageThreadBySlug(entities, drawerSlug);
  }

  if (drawerType === 'details') {
    return selectPinnedMessagesBySlug(entities, displayChannelSlug);
  }

  return [];
};

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
    .filter(sub => sub && channels[sub.channelSlug].hasDm && sub.inSidebar)
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

const channelsWithEntitiesMap = ({ channels, members, channelSubs }, currUserSlug) => (
  values(channels).reduce((acc, curr) => {
    const channel = channels[curr.slug];

    if (!channel) {
      return acc;
    }

    if (!channel.isSub) {
      channel.isSub = channel.members.includes(currUserSlug);
    }

    if (channelSubs) {
      const userSubs = values(channelSubs).filter(sub => (
        sub.channelId === channel.id && sub.userSlug === currUserSlug
      ));

      const [sub] = userSubs;
      if (sub) {
        channel.subId = sub.id;
      } else {
        channel.isSub = false;
      }
    }

    if (channel.hasDm) {
      const dmUser = selectDmWithUser(channel, members, currUserSlug);

      if (dmUser) {
        channel.title = dmUser.username;
        channel.dmUserSlug = dmUser.slug;
      }
    } else {
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

export const selectChannelWithEntitiesBySlug = ({ entities, ...rest }, slug) => {
  const { ui: { displayChannelSlug }, session: { currentUser } } = rest;
  const chatSlug = slug || displayChannelSlug;
  const channels = channelsWithEntitiesMap(entities, currentUser.slug);
  return channels[chatSlug];
};

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

export const selectEntityBySlug = ({ entities }, type, slug) => slug && entities[type][slug];

export const selectUIByDisplay = ({ ui }, display) => ui[display];

const drawerEntitiesType = (drawerType) => {
  switch (drawerType) {
    case 'convo':
      return 'messages';
    case 'team':
      return 'members';
    case 'details':
      return 'channels';
    default:
      return null;
  }
};

export const selectCurrentEntities = ({ entities, ui: { drawer } }, name) => {
  let entityPath = name;

  if (name === 'drawer') {
    entityPath = drawerEntitiesType(drawer.drawerType);
  }

  if (!entityPath) {
    return null;
  }

  return entities[entityPath];
};

export const selectCurrentEntity = (state, name, slug) => {
  const items = selectCurrentEntities(state, name);

  return items ? items[slug] : null;
};

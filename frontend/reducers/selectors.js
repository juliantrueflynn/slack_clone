const values = entities => Object.values(entities);

export const selectSubbedWorkspaces = ({ entities: { workspaces } }) => (
  values(workspaces).filter(({ isSub, isMember }) => isSub && isMember).sort((a, b) => a.id - b.id)
);

export const selectMessagesMap = ({ entities: { messages, members, reactions } }) => (
  values(messages).reduce((acc, curr) => {
    const msg = { ...curr };

    if (curr.thread && curr.thread.length) {
      const threadLastSlug = curr.thread[curr.thread.length - 1];
      const threadLastMsg = messages[threadLastSlug];
      msg.lastMessageDate = threadLastMsg && threadLastMsg.createdAt;
    }

    if (reactions && curr.reactionIds) {
      msg.reactions = curr.reactionIds.map(id => reactions[id]);
    }

    const author = members[curr.authorSlug];

    if (author) {
      msg.username = author.username;
      msg.avatarThumb = author.avatarThumb;
    }

    acc[curr.slug] = msg;

    return acc;
  }, {})
);

export const selectMessages = state => values(selectMessagesMap(state));

const selectConvoBySlug = ({ entities }, slug) => {
  const entries = selectMessagesMap({ entities });
  const message = entries[slug];

  if (!message || !message.thread) {
    return [];
  }

  return message.thread.reduce((acc, curr) => {
    acc.push(entries[curr]);
    return acc;
  }, [message]);
};

const groupByMessageEntityType = (arr) => {
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
  const channel = entities.channels[slug];
  const messagesMap = selectMessagesMap({ entities });
  const messages = channel.messages
    .map(msgSlug => messagesMap[msgSlug])
    .filter(msg => !msg.parentMessageId);
  const entries = messages.filter(msg => msg.entityType === 'entry');
  const subs = messages.filter(msg => msg.entityType !== 'entry').reduce((acc, curr) => {
    const message = { ...curr };
    message.group = [];
    message.channelTitle = `#${channel.title}`;
    acc.push(message);

    return acc;
  }, []);

  const items = [...subs, ...entries].sort((a, b) => a.id - b.id);

  return groupByMessageEntityType(items);
};

const selectAllThreadMessages = ({ entities }) => {
  const messagesMap = selectMessagesMap({ entities });

  return values(messagesMap)
    .reduce((acc, curr) => {
      if (!curr.isInConvo || !curr.thread) {
        return acc;
      }

      const convo = { ...curr };
      convo.thread = curr.thread && curr.thread.map(msgSlug => messagesMap[msgSlug]);

      acc.push(convo);

      return acc;
    }, [])
    .sort((a, b) => new Date(b.lastActive) - new Date(a.lastActive));
};

export const selectChatPageMessagesBySlug = ({ entities }, slug) => {
  if (slug === 'unreads') {
    return selectMessagesMap({ entities });
  }

  if (slug === 'threads') {
    return selectAllThreadMessages({ entities });
  }

  return selectChannelMessagesBySlug({ entities }, slug);
};

export const selectDrawerMessages = ({ entities, ui: { drawer } }) => {
  const { drawerType, drawerSlug } = drawer;

  if (drawerType === 'convo') {
    return selectConvoBySlug({ entities }, drawerSlug);
  }

  return selectMessagesMap({ entities });
};

export const selectChannelsMap = ({ entities, session: { currentUser } }, userSlug) => {
  const { channels, members } = entities;
  const currUserSlug = userSlug || currentUser.slug;

  return values(channels).reduce((acc, curr) => {
    const channel = { ...curr };
    channel.isSub = curr.members.includes(currUserSlug);

    if (channel.hasDm) {
      const subsUserSlugs = channel.members.filter(slug => slug !== currUserSlug);
      const subUser = subsUserSlugs[0] && members[subsUserSlugs[0]];

      if (subUser) {
        channel.title = subUser.username;
        channel.dmUserSlug = subUser.slug;
      }
    } else {
      const owner = members[channel.ownerSlug];
      channel.ownerName = owner && owner.username;
    }

    acc[curr.slug] = channel;

    return acc;
  }, {});
};

export const selectUIByDisplay = ({ ui }, display) => ui[display];

export const selectEntities = ({ entities }, type) => entities[type];

export const selectEntityBySlug = ({ entities }, entityType, slug) => {
  if (!entities[entityType]) {
    return {};
  }

  return entities[entityType][slug] || {};
};

export const selectCurrentUser = ({ session: { currentUser } }) => currentUser;

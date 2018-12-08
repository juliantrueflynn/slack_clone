import { createSelector } from 'reselect';

const values = entities => Object.values(entities);

export const selectSubbedWorkspaces = ({ entities: { workspaces } }) => (
  values(workspaces).filter(({ isSub, isMember }) => isSub && isMember).sort((a, b) => a.id - b.id)
);

const getAllUsers = state => state.entities.members;
const getAllMessages = state => state.entities.messages;
const getAllReactions = state => state.entities.reactions;
const getAllChannels = state => state.entities.channels;

export const getMessagesMap = createSelector(
  [getAllMessages, getAllUsers, getAllReactions],
  (messages, users, reactions) => (
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

      const author = users[curr.authorSlug];

      if (author) {
        msg.username = author.username;
        msg.avatarThumb = author.avatarThumb;
      }

      acc[curr.slug] = msg;

      return acc;
    }, {})
  )
);

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

const getChatPath = state => state.ui.displayChannelSlug;

const selectChannelMessagesBySlug = (msgsMap, msgsSlugs, title) => {
  const msgs = msgsSlugs.map(msgSlug => msgsMap[msgSlug]).filter(msg => !msg.parentMessageId);
  const entries = msgs.filter(msg => msg.entityType === 'entry');
  const subs = msgs.filter(msg => msg.entityType !== 'entry').reduce((acc, curr) => {
    const msg = { ...curr, group: [], channelTitle: `#${title}` };
    return [...acc, msg];
  }, []);

  const items = [...subs, ...entries].sort((a, b) => a.id - b.id);

  return groupByMessageEntityType(items);
};

const selectAllThreadMessages = msgsMap => (
  values(msgsMap).reduce((acc, curr) => {
    if (!curr.isInConvo || !curr.thread) {
      return acc;
    }

    const convo = {
      ...curr,
      thread: curr.thread.map(msgSlug => msgsMap[msgSlug]),
    };

    return [...acc, convo];
  }, []).sort((a, b) => new Date(b.lastActive) - new Date(a.lastActive))
);

export const getChatPageMessages = createSelector(
  [getMessagesMap, getAllChannels, getChatPath],
  (messagesMap, channelsMap, chatPath) => {
    if (chatPath === 'unreads') {
      return messagesMap;
    }

    if (chatPath === 'threads') {
      return selectAllThreadMessages(messagesMap);
    }

    const channel = channelsMap[chatPath];
    if (channel) {
      const { messages, title } = channel;
      return selectChannelMessagesBySlug(messagesMap, messages, title);
    }

    return [];
  }
);

const getDrawer = state => state.ui.drawer;

const getConvosByDrawerSlug = (msgsMap, drawerSlug) => {
  const msg = msgsMap[drawerSlug];

  if (!msg || !msg.thread) {
    return [];
  }

  return msg.thread.reduce((acc, curr) => [...acc, msgsMap[curr]], [msg]);
};

export const getDrawerMessages = createSelector(
  [getDrawer, getMessagesMap],
  (drawer, messagesMap) => {
    if (drawer.drawerType === 'convo') {
      return getConvosByDrawerSlug(messagesMap, drawer.drawerSlug);
    }

    return messagesMap;
  }
);

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

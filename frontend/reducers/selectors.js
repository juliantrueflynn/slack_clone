import { createSelector } from 'reselect';

const values = entities => Object.values(entities);

export const getCurrentUser = state => state.session.currentUser;

const getAllWorkspaces = state => state.entities.workspaces;
const getAllUsers = state => state.entities.members;
const getAllMessages = state => state.entities.messages;
const getAllReactions = state => state.entities.reactions;
const getAllChannels = state => state.entities.channels;
const getAllChannelSubs = state => state.entities.channelSubs;
const getAllFavorites = state => state.entities.favorites;

const getIsEditingMessage = state => state.ui.isEditingMessage;
const getChatPath = state => state.ui.displayChannelSlug;
const getDrawer = state => state.ui.drawer;

export const getSubbedWorkspaces = createSelector(
  [getAllWorkspaces], workspacesMap => (
    values(workspacesMap)
      .filter(({ isSub, isMember }) => isSub && isMember)
      .sort((a, b) => a.id - b.id)
  )
);

export const getMessagesMap = createSelector(
  [getAllMessages, getAllUsers, getAllReactions, getIsEditingMessage],
  (messages, users, reactions, isEditingMsgSlug) => (
    values(messages).reduce((acc, curr) => {
      const msg = { ...curr, isEditing: curr.slug === isEditingMsgSlug };

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

const getConvosByDrawerSlug = (msgsMap, drawerSlug) => {
  const msg = msgsMap[drawerSlug];

  if (!msg || !msg.thread) {
    return [];
  }

  return msg.thread.reduce((acc, curr) => [...acc, msgsMap[curr]], [msg]);
};

const getFavoritesDrawer = (msgsMap, favs) => (
  values(favs).sort((a, b) => (
    new Date(b.createdAt) - new Date(a.createdAt)
  )).map(msg => msgsMap[msg.messageSlug])
);

const getChannelDetailsDrawer = (msgs, chatPath) => (
  msgs.filter(msg => msg.pinId && msg.channelSlug === chatPath)
);

export const getDrawerMessages = createSelector(
  [getDrawer, getChatPath, getMessagesMap, getAllFavorites],
  (drawer, chatPath, messagesMap, favorites) => {
    if (drawer.drawerType === 'convo') {
      return getConvosByDrawerSlug(messagesMap, drawer.drawerSlug);
    }

    if (drawer.drawerType === 'favorites') {
      return getFavoritesDrawer(messagesMap, values(favorites));
    }

    if (drawer.drawerType === 'details') {
      return getChannelDetailsDrawer(values(messagesMap), chatPath);
    }

    return [];
  }
);

export const getChannelsMap = createSelector(
  [getAllChannels, getCurrentUser, getAllUsers],
  (channelsMap, currUser, users) => (
    values(channelsMap).reduce((acc, curr) => {
      const channel = { ...curr, isSub: curr.members.includes(currUser.slug) };

      if (channel.hasDm) {
        const subsUserSlugs = channel.members.filter(slug => slug !== currUser.slug);
        const subUser = subsUserSlugs[0] && users[subsUserSlugs[0]];

        if (subUser) {
          channel.title = subUser.username;
          channel.dmUserSlug = subUser.slug;
        }
      } else {
        const owner = users[channel.ownerSlug];
        channel.ownerName = owner && owner.username;
      }

      acc[curr.slug] = channel;

      return acc;
    }, {})
  )
);

export const getDMChannels = createSelector(
  [getChannelsMap, getAllUsers, getCurrentUser, getAllChannelSubs],
  (channelsMap, usersMap, currentUser, subsMap) => {
    const user = usersMap[currentUser.slug];

    return user.subs.map(subId => subsMap[subId]).filter(sub => (
      channelsMap[sub.channelSlug].hasDm && sub.inSidebar
    )).map((sub) => {
      const ch = { ...channelsMap[sub.channelSlug] };
      const subsUserSlugs = ch.members.filter(userSlug => userSlug !== user.slug);
      const subUser = subsUserSlugs[0] && usersMap[subsUserSlugs[0]];

      if (subUser) {
        ch.title = subUser.username;
        ch.status = subUser.status;
      }

      return ch;
    });
  }
);

export const selectUIByDisplay = ({ ui }, display) => ui[display];

export const selectEntities = ({ entities }, type) => entities[type];

export const selectEntityBySlug = ({ entities }, entityType, slug) => {
  if (!entities[entityType]) {
    return {};
  }

  return entities[entityType][slug] || {};
};

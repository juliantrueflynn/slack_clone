import { createSelector } from 'reselect';
import { dateUtil } from '../util/dateUtil';

const values = entities => Object.values(entities);

export const getCurrentUser = state => state.session.currentUser;

const getAllWorkspaces = state => state.entities.workspaces;
const getAllUsers = state => state.entities.members;
const getAllMessages = state => state.entities.messages;
const getAllChannels = state => state.entities.channels;
const getDisplayChannelData = state => state.displayChannelData;
const getAllChannelSubs = state => state.entities.channelSubs;
const getAllPins = state => state.entities.pins;
const getAllFavorites = state => state.entities.favorites;
const getAllUnreadsByChannel = state => state.unreadsByChannel;
export const getAllUnreads = state => state.entities.unreads;

const getIsEditingMessage = state => state.ui.isEditingMessage;
const getChatPath = state => state.ui.displayChatPath;
const getDrawer = state => state.ui.drawer;

export const getSubbedWorkspaces = createSelector(
  [getAllWorkspaces], workspacesMap => (
    values(workspacesMap)
      .filter(({ isMember }) => isMember)
      .sort((a, b) => a.id - b.id)
  )
);

export const getMessagesMap = createSelector(
  [getAllMessages, getAllUsers, getIsEditingMessage],
  (messages, users, isEditingMsgSlug) => (
    values(messages).reduce((acc, curr) => {
      const msg = {};

      if (curr.thread && curr.thread.length) {
        const threadLastSlug = curr.thread[curr.thread.length - 1];
        const threadLastMsg = messages[threadLastSlug];
        msg.lastMessageDate = threadLastMsg && threadLastMsg.createdAt;
      }

      const author = users[curr.authorSlug];

      if (author) {
        msg.username = author.username;
        msg.avatarThumb = author.avatarThumb;
      }

      const date = dateUtil(curr.createdAt);
      const time = date.localTime();
      let dateCreated;
      if (date.isToday()) {
        dateCreated = date.localTime();
      } else {
        const month = date.monthName({ month: 'short' });
        const day = date.dayOrdinal();
        dateCreated = `${month} ${day}, ${time}`;
      }

      acc[curr.slug] = {
        ...curr,
        ...msg,
        isEditing: curr.slug === isEditingMsgSlug,
        dateCreated,
      };

      return acc;
    }, {})
  )
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

const getChannelViewMessages = (msgsMap, msgsSlugs, title) => {
  const msgs = msgsSlugs.map(msgSlug => msgsMap[msgSlug]);
  const entries = msgs.filter(msg => msg && msg.entityType === 'entry');
  const subs = msgs.filter(msg => msg && msg.entityType !== 'entry').reduce((acc, curr) => {
    const msg = { ...curr, group: [], channelTitle: `#${title}` };
    return [...acc, msg];
  }, []);

  const items = [...subs, ...entries].sort((a, b) => a.id - b.id);

  return groupByMessageEntityType(items);
};

const getAllThreadViewMessages = (msgsMap, unreadsMap, channelsMap) => (
  values(unreadsMap)
    .filter(unread => unread && unread.readableType === 'Message')
    .reduce((acc, curr) => {
      const msg = msgsMap[curr.slug];

      if (!msg || !msg.thread) {
        return acc;
      }

      const replies = msg.thread.map(msgSlug => msgsMap[msgSlug]);
      const parentMsg = {
        ...msgsMap[curr.slug],
        slug: curr.slug,
        channelSlug: msg.channelSlug,
        channelTitle: channelsMap[msg.channelSlug].title,
        messages: [msg, ...replies],
      };

      return [...acc, parentMsg];
    }, [])
    .sort((a, b) => (
      new Date(unreadsMap[b.slug].lastActive) - new Date(unreadsMap[a.slug].lastActive)
    ))
);

export const getDisplayChatPage = createSelector(
  [getChatPath, getChannelsMap, getDisplayChannelData],
  (chatPath, channelsMap, channelData) => {
    const channel = channelsMap[chatPath];

    return { chatPath, ...channel, ...channelData };
  }
);

export const getChatPageMessages = createSelector(
  [getDisplayChatPage, getAllChannels, getMessagesMap, getAllUnreads],
  (chatPage, channelsMap, messagesMap, unreadsMap) => {
    if (chatPage.chatPath === 'unreads') {
      return messagesMap;
    }

    if (chatPage.chatPath === 'threads') {
      return getAllThreadViewMessages(messagesMap, unreadsMap, channelsMap);
    }

    if (chatPage.slug) {
      return getChannelViewMessages(messagesMap, chatPage.messages, chatPage.title);
    }

    return [];
  }
);

export const getConvoBySlug = ({ entities: { messages } }, slug) => {
  const msg = messages[slug];

  if (!msg || !msg.thread) {
    return [];
  }

  return msg.thread.reduce((acc, curr) => [...acc, messages[curr]], [msg]);
};

const getFavoritesDrawer = (msgsMap, favs) => (
  values(favs).sort((a, b) => (
    new Date(b.createdAt) - new Date(a.createdAt)
  )).map(msg => msgsMap[msg.messageSlug])
);

const getChannelDetailsDrawer = (channelData, pinsMap, msgsMap) => (
  channelData.pins.map(id => pinsMap[id]).map(pin => msgsMap[pin.messageSlug])
);

export const getDrawerMessages = createSelector(
  [getDrawer, getDisplayChannelData, getMessagesMap, getAllFavorites, getAllPins],
  (drawer, channelData, messages, favorites, pinsMap) => {
    if (drawer.drawerType === 'convo') {
      return getConvoBySlug({ entities: { messages } }, drawer.drawerSlug);
    }

    if (drawer.drawerType === 'favorites') {
      return getFavoritesDrawer(messages, values(favorites));
    }

    if (drawer.drawerType === 'details') {
      return getChannelDetailsDrawer(channelData, pinsMap, messages);
    }

    return [];
  }
);

const getlastEntry = (msgsMap, slugs) => {
  const msgs = slugs.map(slug => msgsMap[slug]).sort((a, b) => a.id - b.id);

  return msgs[msgs.length - 1];
};

export const getChannelLastEntry = createSelector(
  [getAllMessages, getDisplayChatPage],
  (msgsMap, channel) => (
    getlastEntry(msgsMap, channel.messages)
  )
);

export const getConvoLastEntry = createSelector(
  [getAllMessages, getDrawer],
  (msgsMap, drawer) => {
    if (drawer.drawerType !== 'convo') {
      return false;
    }

    return getlastEntry(msgsMap, msgsMap[drawer.drawerSlug].thread);
  }
);

export const getUnsubbedChannels = createSelector(
  [getChannelsMap], channelsMap => values(channelsMap).filter(ch => !ch.isSub && !ch.hasDm)
);

const getAllUnreadsViewChannels = (channelsMap, unreadsMap, unreadChMsgs) => {
  const unreadChannelsMap = values(channelsMap).reduce((acc, curr) => {
    acc[curr.slug] = { ...curr, unreadMessages: [] };
    return acc;
  }, {});

  return values(unreadsMap)
    .filter(unread => unread && unread.readableType === 'Channel' && unread.hasUnreads)
    .map(unread => ({
      ...unreadChannelsMap[unread.slug],
      unreadMessages: unreadChMsgs[unread.slug] || [],
      lastActive: unread.lastActive,
    }));
};

export const getChatViewChannels = createSelector(
  [getChatPath, getAllChannels, getAllUnreads, getAllUnreadsByChannel],
  (chatPath, channelsMap, unreadsMap, unreadChannelMessages) => {
    if (chatPath === 'unreads') {
      return getAllUnreadsViewChannels(channelsMap, unreadsMap, unreadChannelMessages);
    }

    if (chatPath === 'threads') {
      return values(channelsMap).filter(ch => !ch.hasDm).reduce((acc, curr) => {
        acc[curr.slug] = channelsMap[curr.slug];
        return acc;
      }, {});
    }

    return [];
  }
);

export const getDMChannels = createSelector(
  [getChannelsMap, getAllUsers, getCurrentUser, getAllChannelSubs],
  (channelsMap, usersMap, currentUser, subsMap) => {
    const user = usersMap[currentUser.slug];

    return user.subs.map(subId => subsMap[subId]).filter(sub => (
      sub && channelsMap[sub.channelSlug].hasDm && sub.inSidebar
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

  return entities[entityType][slug] || null;
};

export const getChatPathUrl = ({ ui }) => {
  const { displayWorkspaceSlug: workspaceSlug, displayChatPath: chatPath } = ui;

  if (chatPath !== 'unreads' || chatPath !== 'threads') {
    return `/${workspaceSlug}/messages/${chatPath}`;
  }

  return `/${workspaceSlug}/${chatPath}`;
};

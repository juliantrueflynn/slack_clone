import { createSelector } from 'reselect';
import { dateUtil } from '../util/dateUtil';

const values = entities => Object.values(entities);

export const getCurrentUser = state => state.session.currentUser;
const getAllWorkspaces = state => state.entities.workspaces;
const getAllUsers = state => state.entities.members;
const getAllMessages = state => state.entities.messages;
const getAllChatrooms = state => state.entities.chatrooms;
const getAllChatroomSubs = state => state.entities.chatroomSubs;
const getAllPins = state => state.entities.pins;
const getAllFavorites = state => state.entities.favorites;
const getAllUnreadsByChannel = state => state.unreadsByChannel;
export const getAllUnreads = state => state.entities.unreads;
const getIsEditingMessage = state => state.ui.isEditingMessage;
const getChatPath = state => state.ui.displayChatroomSlug;
export const getDrawer = state => state.ui.drawer;

export const getSubbedWorkspaces = createSelector(
  [getAllWorkspaces], workspacesMap => (
    values(workspacesMap)
      .filter(({ isMember }) => isMember)
      .sort((a, b) => a.id - b.id)
  )
);

export const getMessagesMap = createSelector(
  [getAllMessages, getAllUsers, getIsEditingMessage],
  (messages, usersMap, isEditingMsgSlug) => (
    values(messages).reduce((acc, curr) => {
      const { username, avatarThumb } = usersMap[curr.authorSlug] || {};
      const msg = { username, avatarThumb };

      if (curr.thread && curr.thread.length) {
        const threadLastSlug = curr.thread[curr.thread.length - 1];
        const threadLastMsg = messages[threadLastSlug];
        msg.lastMessageDate = threadLastMsg && threadLastMsg.createdAt;
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

export const getChatroomsMap = createSelector(
  [getAllChatrooms, getCurrentUser, getAllUsers],
  (chatroomsMap, currUser, usersMap) => (
    values(chatroomsMap).reduce((acc, curr) => {
      const chatroom = {};

      if (curr.hasDm) {
        const subsUserSlugs = curr.members.filter(slug => slug !== currUser.slug);
        const subUser = subsUserSlugs[0] && usersMap[subsUserSlugs[0]];

        if (subUser) {
          chatroom.title = subUser.username;
          chatroom.dmUserSlug = subUser.slug;
        }
      } else {
        const owner = usersMap[curr.ownerSlug];
        chatroom.ownerName = owner && owner.username;
      }

      acc[curr.slug] = {
        ...curr,
        ...chatroom,
        isSub: curr.members.includes(currUser.slug),
        createdAt: dateUtil(curr.createdAt).monthDayYear(),
      };

      return acc;
    }, {})
  )
);

export const getChatPage = createSelector(
  [getChatroomsMap, getChatPath], (chatroomsMap, chatroomSlug) => chatroomsMap[chatroomSlug]
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

export const getChatroomViewMessages = createSelector(
  [getMessagesMap, getAllChatrooms, getChatPath],
  (msgsMap, chatrooms, chatroomSlug) => {
    const chatroom = chatrooms[chatroomSlug];
    const roomMsgs = chatroom ? chatroom.messages : [];

    const msgs = roomMsgs.map(msgSlug => msgsMap[msgSlug]);
    const entries = msgs.filter(msg => msg && msg.entityType === 'entry');
    const subs = msgs.filter(msg => msg && msg.entityType !== 'entry').reduce((acc, curr) => (
      [...acc, { ...curr, group: [] }]
    ), []);

    const items = [...subs, ...entries].sort((a, b) => a.id - b.id);

    return groupByMessageEntityType(items);
  }
);

export const getAllThreadViewMessages = createSelector(
  [getMessagesMap, getAllUnreads, getChatroomsMap],
  (msgsMap, unreadsMap, chMap) => (
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
          chatroomSlug: msg.chatroomSlug,
          chatroomTitle: chMap[msg.chatroomSlug].title,
          messages: [msg, ...replies],
        };

        return [...acc, parentMsg];
      }, [])
      .sort((a, b) => (
        new Date(unreadsMap[b.slug].lastActive) - new Date(unreadsMap[a.slug].lastActive)
      ))
  )
);

export const getConvoBySlug = ({ entities: { messages } }, slug) => {
  const msg = messages[slug];

  if (!msg || !msg.thread) {
    return [];
  }

  return msg.thread.reduce((acc, curr) => [...acc, messages[curr]], [msg]);
};

export const getConvoDrawer = createSelector(
  [getMessagesMap, getDrawer],
  (messages, drawer) => getConvoBySlug({ entities: { messages } }, drawer.drawerSlug)
);

export const getFavoritesDrawer = createSelector(
  [getAllFavorites, getMessagesMap],
  (favsMap, msgsMap) => (
    values(favsMap).sort((a, b) => (
      new Date(b.createdAt) - new Date(a.createdAt)
    )).map(msg => msgsMap[msg.messageSlug])
  )
);

export const getChatroomDetailsDrawer = createSelector(
  [getChatPage, getAllPins, getMessagesMap],
  (chatPage, pinsMap, msgsMap) => (
    chatPage && chatPage.pins.map(id => pinsMap[id])
      .map(pin => msgsMap[pin.messageSlug])
  )
);

const getLastEntry = (msgsMap, slugs) => {
  const msgs = slugs.map(slug => msgsMap[slug]).sort((a, b) => a.id - b.id);

  return msgs[msgs.length - 1];
};

export const getChatroomLastEntry = createSelector(
  [getAllMessages, getChatPath, getAllChatrooms],
  (msgsMap, chatroomSlug, chatroomsMap) => (
    getLastEntry(msgsMap, chatroomsMap[chatroomSlug] ? chatroomsMap[chatroomSlug].messages : [])
  )
);

export const getConvoLastEntry = createSelector(
  [getAllMessages, getDrawer],
  (msgsMap, drawer) => {
    if (drawer.drawerType !== 'convo') {
      return false;
    }

    return getLastEntry(msgsMap, msgsMap[drawer.drawerSlug].thread);
  }
);

export const getUnsubbedChannels = createSelector(
  [getChatroomsMap], chatroomsMap => values(chatroomsMap).filter(ch => !ch.isSub && !ch.hasDm)
);

export const getAllUnreadsViewChannels = createSelector(
  [getChatroomsMap, getAllUnreads, getAllUnreadsByChannel],
  (chatroomsMap, unreadsMap, unreadChannelMessages) => {
    const unreadChannelsMap = values(chatroomsMap).reduce((acc, curr) => {
      acc[curr.slug] = { ...curr, unreadMessages: [] };
      return acc;
    }, {});

    return values(unreadsMap)
      .filter(unread => unread && unread.readableType === 'Chatroom' && unread.hasUnreads)
      .map(unread => ({
        ...unreadChannelsMap[unread.slug],
        unreadMessages: unreadChannelMessages[unread.slug] || [],
        lastActive: unread.lastActive,
      }));
  }
);

export const getDMChannels = createSelector(
  [getChatroomsMap, getAllUsers, getCurrentUser, getAllChatroomSubs],
  (chatroomsMap, usersMap, currentUser, subsMap) => {
    const user = usersMap[currentUser.slug];

    return user.subs.map(subId => subsMap[subId]).filter(sub => (
      sub && chatroomsMap[sub.chatroomSlug].hasDm && sub.inSidebar
    )).map((sub) => {
      const ch = chatroomsMap[sub.chatroomSlug];
      const subsUserSlugs = ch.members.filter(userSlug => userSlug !== user.slug);
      const dmSubUser = usersMap[subsUserSlugs[0]];
      const { username: title, status } = dmSubUser || {};

      return { ...ch, title, status };
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

export const getDrawerPath = ({ ui: { drawer: { drawerType, drawerSlug } } }) => {
  if (drawerType) {
    if (drawerSlug) {
      return `/${drawerType}/${drawerSlug}`;
    }

    return `/${drawerType}`;
  }

  return '';
};

export const getChatPathUrl = ({ ui }) => {
  const { displayWorkspaceSlug: workspaceSlug, displayChatroomSlug: chatroomSlug } = ui;

  if (chatroomSlug !== 'unreads' || chatroomSlug !== 'threads') {
    return `/${workspaceSlug}/messages/${chatroomSlug}`;
  }

  return `/${workspaceSlug}/${chatroomSlug}`;
};

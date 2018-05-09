import values from 'lodash/values';

export const getWorkspaces = state => (
  values(state.entities.workspaces)
);

export const getWorkspacesWithKeys = state => (
  state.entities.workspaces
);

export const getPageWorkspaceSlug = state => (
  state.ui.displayWorkspaceId
);

export const getChannels = state => (
  values(state.entities.channels)
);

export const getChannelPageId = state => (
  state.ui.displayChannelId
);

export const getChannelById = (state, channelId) => (
  state.entities.channels[channelId]
);

export const getCurrentUser = state => (
  state.session.currentUser
);

export const getMessages = state => (
  values(state.entities.messages).filter(message =>
    message.parentMessageId === null
  )
);

export const getMessageById = (state, messageId) => (
  state.entities.messages[messageId]
);

export const getThreadId = state => state.ui.displayThreadId;

export const getThreadEntries = state => (
  values(state.entities.messages).filter(message =>
    message.parentMessageId === state.ui.displayThreadId
  )
);
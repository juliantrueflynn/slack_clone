import values from 'lodash/values';

export const getWorkspaces = state => (
  values(state.entities.workspaces)
);

export const getWorkspacesWithKeys = state => (
  state.entities.workspaces
);

export const getPageWorkspaceSlug = state => (
  state.ui.displayWorkspaceSlug
);

export const getCurrentWorkspaceId = ({ ui, entities }) => {
  const workspace = entities.workspaces[ui.displayWorkspaceSlug];
  return workspace ? workspace.id : null;
};

export const getChannels = state => (
  values(state.entities.channels)
);

export const getPageChannelSlug = state => (
  state.ui.displayChannelSlug
);

export const getCurrentChannelId = ({ ui, entities }) => {
  const channel = entities.channels[ui.displayChannelSlug];
  return channel ? channel.id : null;
};

export const getChannelById = (state, channelSlug) => (
  state.entities.channels[channelSlug]
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
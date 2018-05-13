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

export const getMessages = ({ entities: { messages, channels }, ui }) => {
  const currentChannel = channels[ui.displayChannelSlug];
  if (!currentChannel) return [];

  return values(messages).filter(message => 
    !message.parentMessageSlug && currentChannel.id === message.channelId
  );
};

export const getCurrentSidebarThread = ({ entities, ui: { rightSidebar } }) => (
  rightSidebar && entities.messages[rightSidebar.sidebarProps.messageSlug]
);

export const getMessageSlug = ({ ui: { rightSidebar } }) => (
  rightSidebar && rightSidebar.sidebarType === "THREAD" ?
  rightSidebar.sidebarProps.messageSlug :
  null
);

export const getThread = ({ entities: { messages }, ui: { rightSidebar } }) => {
  if (!rightSidebar || rightSidebar.sidebarType !== "THREAD") return [];
  const currentMessage = messages[rightSidebar.sidebarProps.messageSlug];
  if (!currentMessage) return [];
  
  return values(messages).filter(message =>
    message.parentMessageSlug === currentMessage.slug
  );
};
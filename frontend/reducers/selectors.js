import values from 'lodash/values';

export const getWorkspaces = state => (
  values(state.entities.workspaces)
);

export const getPageWorkspaceSlug = state => (
  state.ui.displayWorkspaceSlug
);

export const getChannels = state => (
  values(state.entities.channels)
);

export const getPageChannelSlug = state => (
  state.ui.displayChannelSlug
);

export const getMessages = ({ entities: { messages, channels }, ui }) => {
  const currentChannel = channels[ui.displayChannelSlug];
  
  if (!currentChannel) {
    return [];
  }

  return values(messages).filter(message => 
    !message.parentMessageId && currentChannel.id === message.channelId
  );
};

export const getCurrentMessageBySlug = ({ entities }, messageSlug) => (
  entities.messages[messageSlug] || null
);

export const getMessageSlug = ({ ui: { rightSidebar } }) => (
  rightSidebar && rightSidebar.sidebarType === 'Thread' ?
  rightSidebar.sidebarProps.messageSlug :
  null
);

export const getThread = ({ entities: { messages }, ui: { rightSidebar } }) => {
  if (!rightSidebar || rightSidebar.sidebarType !== 'Thread') {
    return [];
  }

  const messageSlug = rightSidebar.sidebarProps.messageSlug;
  
  if (!messages[messageSlug] || !messageSlug) {
    return [];
  }
  
  return values(messages).filter(message => {
    return message.parentMessageId === messages[messageSlug].id;
  });
};
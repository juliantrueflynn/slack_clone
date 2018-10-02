import React from 'react';
import AllUnreads from './AllUnreads';
import AllThreads from './AllThreads';
import Channel from './Channel';

const ChatPageBody = ({
  chatPath,
  chatTitle,
  messages,
  users,
  channels,
  currentUser,
  isLoading,
  clearUnreads,
  fetchHistoryRequest,
}) => {
  if (isLoading) {
    return (
      <div className="ChatPage__container">
        <div className="ChatPage__loader">
          Messages loading...
        </div>
      </div>
    );
  }

  return (
    <div className="ChatPage__container">
      <AllUnreads
        chatPath={chatPath}
        authors={users}
        unreadChannels={channels}
        clearUnreads={clearUnreads}
        isLoading={isLoading}
        messages={messages}
      />
      <AllThreads
        chatPath={chatPath}
        users={users}
        channels={channels}
        currentUser={currentUser}
        isLoading={isLoading}
        convos={messages}
      />
      <Channel
        chatPath={chatPath}
        chatTitle={chatTitle}
        authors={users}
        channels={channels}
        currentUser={currentUser}
        isLoading={isLoading}
        messages={messages}
        fetchHistoryRequest={fetchHistoryRequest}
      />
    </div>
  );
};

export default ChatPageBody;

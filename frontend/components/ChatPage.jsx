import React from 'react';
import { withRouter } from 'react-router-dom';
import EmojiModalContainer from './EmojiModalContainer';
import ChannelHeader from './ChannelHeader';

const ChatPage = ({
  match: { isExact, params: { channelSlug } },
  chatTitle,
  chatClassName,
  isReactionModalOpen,
  children,
}) => {
  let chatClassNames = 'ChannelPage';
  if (chatClassName) chatClassNames += ` ChannelPage__${chatClassName}`;
  if (isReactionModalOpen) chatClassNames += ' ChannelPage--reaction';
  if (!isExact && channelSlug) chatClassNames += ' ChannelPage--sidebar-open';

  return (
    <div className={chatClassNames}>
      <ChannelHeader sectionTitle={chatTitle} />
      <div className="ChannelPage__body">
        <div className="ChannelPage__container">
          <EmojiModalContainer />
          {children}
        </div>
      </div>
    </div>
  );
};

export default withRouter(ChatPage);

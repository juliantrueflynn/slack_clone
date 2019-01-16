import React from 'react';
import { withRouter } from 'react-router-dom';
import PinnedMessagesItem from '../PinnedMessagesItem';
import AccordionItemBody from '../AccordionItemBody';

const AccordionBodyPins = ({
  messages,
  currentUserSlug,
  destroyPinRequest,
  match: { url },
}) => {
  const isEmpty = !messages || !messages.length;
  const emptyText = 'No messages have been pinned yet!';

  return (
    <AccordionItemBody isEmpty={isEmpty} emptyText={emptyText}>
      {messages.map(message => (
        <PinnedMessagesItem
          key={message.id}
          message={message}
          currentUserSlug={currentUserSlug}
          url={url}
          destroyPinRequest={destroyPinRequest}
        />
      ))}
    </AccordionItemBody>
  );
};

export default withRouter(AccordionBodyPins);

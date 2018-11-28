import React from 'react';
import PinnedMessagesItem from './PinnedMessagesItem';
import AccordionItemBody from './AccordionItemBody';

const AccordionBodyPins = ({ messages, destroyPinRequest }) => {
  const isEmpty = !messages || !messages.length;
  const emptyText = 'No messages have been pinned yet!';

  return (
    <AccordionItemBody isEmpty={isEmpty} emptyText={emptyText}>
      {messages.map(message => (
        <PinnedMessagesItem
          key={message.id}
          message={message}
          destroyPinRequest={destroyPinRequest}
        />
      ))}
    </AccordionItemBody>
  );
};

export default AccordionBodyPins;

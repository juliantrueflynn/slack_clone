import React from 'react';
import AccordionItemBody from '../AccordionItemBody';
import Button from '../Button';
import './styles.css';

const AccordionBodyInfo = ({ chatroom, currentUserSlug, openModal }) => {
  const dateText = `${chatroom.createdAt} by ${chatroom.ownerName}`;
  const openChannelEditor = () => openModal('MODAL_FORM_CHATROOM', { chatroom, currentUserSlug });

  return (
    <AccordionItemBody>
      <div className="AccordionItem__sub AccordionBodyInfo__topic-sub">
        <header className="AccordionBodyInfo__topic-header">
          <h5 className="AccordionBodyInfo__subtitle">Purpose</h5>
          {!!chatroom.topic && (
            <Button onClick={openChannelEditor} buttonFor="edit-topic" unStyled>edit</Button>
          )}
        </header>
        {chatroom.topic}
        {!!chatroom.topic || (
          <Button onClick={openChannelEditor} size="sm">Set a channel topic</Button>
        )}
      </div>
      <div className="AccordionItem__sub">
        <h5 className="AccordionBodyInfo__subtitle">Created</h5>
        {dateText}
      </div>
    </AccordionItemBody>
  );
};

export default AccordionBodyInfo;

import React from 'react';
import { dateUtil } from '../util/dateUtil';
import AccordionItemBody from './AccordionItemBody';
import Button from './Button';
import './AccordionBodyInfo.css';

const AccordionBodyInfo = ({ channel, currentUserSlug, openModal }) => {
  const dateCreated = dateUtil(channel.createdAt).monthDayYear();
  const dateText = `${dateCreated} by ${channel.ownerName}`;
  const openChannelEditor = () => openModal('MODAL_FORM_CHANNEL', { channel, currentUserSlug });

  return (
    <AccordionItemBody>
      <div className="AccordionItem__sub AccordionBodyInfo__topic-sub">
        <header className="AccordionBodyInfo__topic-header">
          <h5 className="AccordionBodyInfo__subtitle">Purpose</h5>
          {!!channel.topic && (
            <Button onClick={openChannelEditor} buttonFor="edit-topic" unStyled>
              edit
            </Button>
          )}
        </header>
        {channel.topic}
        {!!channel.topic || (
          <Button onClick={openChannelEditor} size="sm">
            Set a channel topic
          </Button>
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

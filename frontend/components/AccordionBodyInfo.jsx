import React from 'react';
import { dateUtil } from '../util/dateUtil';
import AccordionItemBody from './AccordionItemBody';
import Button from './Button';
import './AccordionBodyInfo.css';

const AccordionBodyInfo = ({ channel, modalOpen }) => {
  const dateCreated = dateUtil(channel.createdAt).monthDayYear();
  const dateText = `${dateCreated} by ${channel.ownerName}`;

  const openChannelEditor = () => modalOpen('MODAL_EDIT_CHANNEL');
  const hasTopic = !!channel.topic;

  return (
    <AccordionItemBody>
      <div className="AccordionItem__sub AccordionBodyInfo__topic-sub">
        <header className="AccordionBodyInfo__topic-header">
          <h5 className="AccordionBodyInfo__subtitle">Purpose</h5>
          {hasTopic && (
            <Button onClick={openChannelEditor} buttonFor="edit-topic" unStyled>
              edit
            </Button>
          )}
        </header>
        {channel.topic || 'Set a channel topic'}
      </div>
      <div className="AccordionItem__sub">
        <h5 className="AccordionBodyInfo__subtitle">Created</h5>
        {dateText}
      </div>
    </AccordionItemBody>
  );
};

export default AccordionBodyInfo;

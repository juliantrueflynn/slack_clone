import React from 'react';
import { dateUtil } from '../util/dateUtil';
import AccordionItemBody from './AccordionItemBody';
import Button from './Button';
import './AccordionBodyInfo.css';

const AccordionBodyInfo = ({
  topic,
  createdAt,
  ownerName,
  openModal,
}) => {
  const dateCreated = dateUtil(createdAt).monthDayYear();
  const dateText = `${dateCreated} by ${ownerName}`;
  const openChannelEditor = () => openModal('MODAL_FORM_CHANNEL');

  return (
    <AccordionItemBody>
      <div className="AccordionItem__sub AccordionBodyInfo__topic-sub">
        <header className="AccordionBodyInfo__topic-header">
          <h5 className="AccordionBodyInfo__subtitle">Purpose</h5>
          {!!topic && (
            <Button onClick={openChannelEditor} buttonFor="edit-topic" unStyled>
              edit
            </Button>
          )}
        </header>
        {topic}
        {!!topic || (
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

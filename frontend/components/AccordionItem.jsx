import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './Button';
import './AccordionItem.css';

const AccordionItem = ({
  icon,
  name,
  itemTitle,
  isShowing,
  itemToggle,
  body,
}) => (
  <div className={`AccordionItem AccordionItem__${name}`}>
    <h3 className="AccordionItem__title">
      <Button buttonFor="accordion" unStyled onClick={() => itemToggle()}>
        <FontAwesomeIcon icon={icon} fixedWidth />
        {itemTitle}
      </Button>
    </h3>
    {isShowing && (
      <div className="AccordionItem__body">
        {body}
      </div>
    )}
  </div>
);

export default AccordionItem;

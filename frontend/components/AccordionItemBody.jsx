import React from 'react';
import './AccordionItemBody.css';

const AccordionItemBody = ({ isEmpty, emptyText, children }) => {
  if (isEmpty) {
    return (
      <div className="AccordionItemBody AccordionItemBody__empty">
        {emptyText.toString()}
      </div>
    );
  }

  return (
    <div className="AccordionItemBody">
      {children}
    </div>
  );
};

export default AccordionItemBody;

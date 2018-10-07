import React from 'react';

const ChannelSub = ({ sub }) => {
  const parentText = (entity) => {
    const typeText = entity.entityType === 'sub_create' ? 'joined' : 'left';
    const isParent = sub.id === entity.id;

    let string = typeText;
    if (!isParent) {
      string = `${entity.authorName} ${typeText}`;
    }

    if (isParent) {
      string += ` ${entity.channelTitle}`;
    }

    if (isParent && sub.group.length) {
      return string;
    }

    return `${string}.`;
  };

  const childrenSingleOrMultiText = (arr) => {
    let string = '';
    if (arr.length === 1) {
      string = ` along with ${arr[0].authorName}.`;
    }

    if (arr.length > 1) {
      string = ` along with ${arr.length} others.`;
    }

    return string;
  };

  let bodyText = parentText(sub);

  const has1Type = sub.group.every(item => item.entityType === sub.entityType);

  if (has1Type) {
    bodyText += childrenSingleOrMultiText(sub.group);
  }

  if (!has1Type) {
    const bySubType1 = sub.group.filter(item => item.entityType === sub.entityType);
    const subsByType2 = sub.group.filter(item => item.entityType !== sub.entityType);
    const childSubsType2 = subsByType2.slice(1);

    bodyText += childrenSingleOrMultiText(bySubType1);
    bodyText += ` Also, ${parentText(subsByType2[0])}`;
    bodyText += childrenSingleOrMultiText(childSubsType2);
  }

  return (
    <div className="ChannelSub">
      {bodyText}
    </div>
  );
};

export default ChannelSub;

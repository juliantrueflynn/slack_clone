import React from 'react';

const ChannelSub = ({ sub }) => {
  if (!sub.group) {
    return null;
  }

  const parentText = (entity) => {
    const typeText = entity.entityType === 'sub_create' ? 'joined' : 'left';
    const isParent = sub.id === entity.id;

    let string = typeText;
    if (!isParent) {
      string = `${entity.username} ${typeText}`;
    }

    if (isParent) {
      string += ` ${entity.chatroomTitle}`;
    }

    if (isParent && sub.group.length) {
      return string;
    }

    return `${string}.`;
  };

  const childrenSingleOrMultiText = (parent, arr) => {
    let string = '';

    if (arr.length === 1 && parent) {
      if (parent.authorId !== arr[0].authorId) {
        string = ` along with ${arr[0].username}.`;
      }
    }

    if (arr.length > 1 && parent) {
      const authorIds = arr.map(item => item.authorId).filter((id, idx, self) => (
        id !== parent.authorId && self.indexOf(id) === idx
      ));

      if (authorIds.length) {
        string = ` along with ${authorIds.length} others.`;
      }
    }

    return string;
  };

  const has1Type = sub.group.every(item => item.entityType === sub.entityType);
  let bodyText = parentText(sub);

  if (has1Type) {
    bodyText += childrenSingleOrMultiText(sub, sub.group);
  }

  if (!has1Type) {
    const bySubType1 = sub.group.filter(item => item.entityType === sub.entityType);
    const subsByType2 = sub.group.filter(item => item.entityType !== sub.entityType);
    const childSubsType2 = subsByType2.slice(1);

    bodyText += childrenSingleOrMultiText(sub, bySubType1);
    bodyText += ` Also, ${parentText(subsByType2[0])}`;
    bodyText += childrenSingleOrMultiText(subsByType2[0], childSubsType2);
  }

  const style = { color: '#636E72' };

  return (
    <div className="ChannelSub" style={style}>
      {bodyText}
    </div>
  );
};

export default ChannelSub;

import React from 'react';

const ChannelSub = ({ sub }) => {
  const bodyText = `${sub.authorName} joined ${sub.channelTitle}`;
  let alongWith;
  if (sub.group && sub.group.length) {
    const names = sub.group.join(', ');
    alongWith = ` along with ${names}.`;
  }

  return (
    <div className="ChannelSub">
      {bodyText}
      {alongWith}
    </div>
  );
};

export default ChannelSub;

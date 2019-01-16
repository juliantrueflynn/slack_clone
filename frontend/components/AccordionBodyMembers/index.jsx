import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import StatusIcon from '../StatusIcon';
import Avatar from '../Avatar';
import AccordionItemBody from '../AccordionItemBody';

const AccordionBodyMembers = ({ members, usersMap, match: { params } }) => {
  const isEmpty = !members || !members.length;
  const emptyText = 'No members';

  const { 0: pagePath, chatPath, workspaceSlug } = params;
  let teamUrl = `/${workspaceSlug}/${pagePath}`;
  if (chatPath) {
    teamUrl += `/${chatPath}`;
  }
  teamUrl += '/team';

  return (
    <AccordionItemBody isEmpty={isEmpty} emptyText={emptyText}>
      {members.map(userSlug => (
        <Link key={userSlug} to={`${teamUrl}/${userSlug}`} className="AccordionItem__sub">
          <StatusIcon member={usersMap[userSlug]} />
          <Avatar avatarFor="details-drawer" user={usersMap[userSlug]} size="22" />
          {usersMap[userSlug].username}
        </Link>
      ))}
    </AccordionItemBody>
  );
};

export default withRouter(AccordionBodyMembers);

import React from 'react';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-regular-svg-icons';
import EmptyDisplay from '../EmptyDisplay';
import ScrollBar from '../ScrollBar';
import AllThreadsItem from '../AllThreadsItem';

const AllThreads = ({ messages, isLoading, ...props }) => {
  if (isLoading) {
    return <EmptyDisplay loadingIcon={faCircleNotch} />;
  }

  if (!messages.length) {
    return (
      <EmptyDisplay topIcon={faComments} topIconHexColor="#B2BEC3">
        No conversations started
      </EmptyDisplay>
    );
  }

  return (
    <div className="AllThreads">
      <ScrollBar>
        {messages.map(convo => <AllThreadsItem key={convo.slug} convo={convo} {...props} />)}
      </ScrollBar>
    </div>
  );
};

export default AllThreads;

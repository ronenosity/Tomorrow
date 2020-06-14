import React from 'react';

import Thread from './ThreadPreview';

const ThreadList = ({ threads, refetch }) => {
  return threads.map(thread =>  <Thread key={thread.id} thread={thread} refetch={refetch} />);
};

export default ThreadList;

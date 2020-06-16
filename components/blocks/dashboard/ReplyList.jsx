import React from 'react';

import Reply from './Reply';

const ReplyList = ({ replies }) => {
    return replies.map(reply => <Reply key={reply.id} reply={reply} />);
};

export default ReplyList;

import React from 'react';
import { includes, get } from 'lodash';
import { useMutation } from '@apollo/react-hooks';
import { IconButton } from '@material-ui/core';
import { AiOutlineDislike, AiOutlineLike, AiFillLike, AiFillDislike } from 'react-icons/ai';
import { ThreadStat, ThreadStatValue } from '../../../common-styles';
import { useAuthContext } from '../../contexts/auth';
import LIKE_THREAD from '../../../front-end-mutations/like-thread';
import REMOVE_VOTE_THREAD from '../../../front-end-mutations/remove-vote-thread';
import DISLIKE_THREAD from '../../../front-end-mutations/dislike-thread';

interface Props {
  thread: Record<any, any>;
  refetch: () => void;
}
const Likes: React.FC<Props> = ({ thread, refetch }: Props) => {
  const { user } = useAuthContext();
  const userId = get(user, 'id');
  const [likeThread] = useMutation(LIKE_THREAD, {
    variables: {
      id: thread.id,
      userId,
    },
  });
  const [removeVote] = useMutation(REMOVE_VOTE_THREAD, {
    variables: {
      id: thread.id,
      userId,
    },
  });

  const [dislikeThread] = useMutation(DISLIKE_THREAD, {
    variables: {
      id: thread.id,
      userId,
    },
  });
  const alreadyLiked = includes(thread.likedBy, userId);
  const alreadyDisliked = includes(thread.deslikedBy, userId);

  const onLike = async () => {
    if (!userId) return;
    await likeThread();
    refetch();
  };

  const onDislike = async () => {
    if (!userId) return;
    await dislikeThread();
    refetch();
  };

  const onRemove = async () => {
    if (!userId) return;
    await removeVote();
    refetch();
  };
  return (
    <>
      <ThreadStat data-tooltip="Likes">
        {alreadyLiked ? (
          <IconButton>
            <AiFillLike onClick={onRemove} />{' '}
          </IconButton>
        ) : (
          <IconButton>
            <AiOutlineLike onClick={onLike} />
          </IconButton>
        )}
        <ThreadStatValue>{thread.likes}</ThreadStatValue>
      </ThreadStat>
      <ThreadStat data-tooltip="Dislikes">
        {alreadyDisliked ? (
          <IconButton>
            <AiFillDislike onClick={onRemove} />{' '}
          </IconButton>
        ) : (
          <IconButton>
            <AiOutlineDislike onClick={onDislike} />
          </IconButton>
        )}
        <ThreadStatValue>{thread.dislikes}</ThreadStatValue>
      </ThreadStat>
    </>
  );
};

export default Likes;

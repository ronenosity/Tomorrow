import React, { useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Box, IconButton } from '@material-ui/core';
import { MdNotificationsNone, MdNotifications } from 'react-icons/md';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import FormDialog from '../new-edit-community/dialog';
import useIsOpen from '../../../hooks/useIsOpen';
import { useCommunitiesContext } from '../../contexts/communities';
import {useAuthContext} from "../../contexts/auth";
import useIsUserSubscribed from '../../../hooks/useIsUserSubscribed';
import Link from "../../../routes";

const useStyles = makeStyles({
  root: {
    width: 200,
  },
  media: {
    height: 140,
  }
});
interface Props {
  community: Record<any, any>;
}

const SubscribeContainer = styled(Box)`
  position: absolute;
  outline: white 1px;
`;

const Greet = ({ name }) => <div>Hello {name}</div>;

const CommunityCard: React.FC<Props> = ({ community }: Props) => {
  const classes = useStyles();
  const { isAdmin, user } = useAuthContext();
  const { deleteCommunity, subscribeCommunity, unsubscribeCommunity, loading, refetch } = useCommunitiesContext();
  const { isOpen, close, toggle } = useIsOpen();

  const onClickDelete = useCallback(async () => {
    await deleteCommunity({ variables: { id: community.id } });
    refetch();
  }, [refetch, deleteCommunity, community]);

  const onClickSubscribe = useCallback(async () => {
    if (!user) {
      return toast.error('You must be logged in to subscribe');
    }
    await subscribeCommunity({ variables: { id: community.id } });
    refetch();
  }, [user, subscribeCommunity, community.id, refetch]);

  const onClickUnsubscribe = useCallback(async () => {

     await unsubscribeCommunity({ variables: { id: community.id } });
     refetch();


  }, [unsubscribeCommunity, community.id, refetch]);

  useEffect(() => {
    refetch();
  }, [loading, refetch, community]);

  const isSubscribed = useIsUserSubscribed(community.id);

  return (
    <>
      <Card className={classes.root}>
        <SubscribeContainer>
          {isSubscribed ? (
            <IconButton onClick={onClickUnsubscribe}>
              <MdNotifications stroke="white" strokeWidth={1} size={30} color="black"  />
            </IconButton>
          ): (
            <IconButton onClick={onClickSubscribe}>
              <MdNotificationsNone stroke="white" strokeWidth={1} size={30} color="black" />
            </IconButton>
          )}
        </SubscribeContainer>
        <CardMedia className={classes.media} image={community.picture} title={community.name} />
        <CardActionArea onClick={toggle}>
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2">
              {community.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {community.description}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {community.category}
            </Typography>
          </CardContent>
        </CardActionArea>
        {isAdmin && (
          <CardActions>
            <Button size="small" color="primary" onClick={toggle}>
              Edit
            </Button>
            <Button size="small" color="primary" onClick={onClickDelete}>
              Delete
            </Button>
          </CardActions>
        )}
      </Card>
      {isAdmin && (
        <FormDialog isOpen={isOpen} close={close} toggle={toggle} community={community} />
      )}
    </>
  );
};

export default CommunityCard;

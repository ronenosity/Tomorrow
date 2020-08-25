import React, { useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import FormDialog from '../new-edit-community/dialog';
import useIsOpen from '../../../hooks/useIsOpen';
import { useCommunitiesContext } from '../../contexts/communities';
import {useAuthContext} from "../../contexts/auth";

const useStyles = makeStyles({
  root: {
    width: 200,
  },
  media: {
    height: 140,
  },
});
interface Props {
  community: Record<any, any>;
}

const SubscribeContainer = styled(Box)`
  position: absolute;
  outline: white 1px;
`;

const Teste = ({ slug, picture, name, style }) => (
  <Link route="dashboard" params={{ c: String(slug) }}>
    <CardMedia className={style} image={picture} title={name} />
  </Link>
);

interface Community {
  community: {
    id: string;
    slug: string;
    name: string;
    description: string;
    title: string;
    category: string;
    picture: string;
  };
}

const CommunityCard = ({ community }: Community) => {
  const classes = useStyles();
  const { isAdmin } = useAuthContext();
  const { deleteCommunity, loading, refetch } = useCommunitiesContext();
  const { isOpen, close, toggle } = useIsOpen();

  const onClickDelete = useCallback(async () => {
    await deleteCommunity({ variables: { id: community.id } });
  }, [deleteCommunity, community]);

  useEffect(() => {
    refetch();
  }, [loading, refetch, community]);

  return (
    <>
      <Card className={classes.root}>
        <SubscribeContainer>
          {isSubscribed ? (
            <IconButton>
              <MdNotifications stroke="white" strokeWidth={1} size={30} color="black"  />
            </IconButton>
          ): (
            <IconButton onClick={onClickSubscribe}>
              <MdNotificationsNone stroke="white" strokeWidth={1} size={30} color="black" />
            </IconButton>
          )}
        </SubscribeContainer>
        <CardMedia className={classes.media} image={community.picture} title={community.title} />
        <CardActionArea onClick={toggle}>
          <CardMedia className={classes.media} image={community.picture} title={community.name} />
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

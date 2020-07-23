import React, { useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import FormDialog from '../new-edit-community/dialog';
import useIsOpen from '../../../hooks/useIsOpen';
import { useCommunitiesContext } from '../../contexts/communities';

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
const CommunityCard: React.FC<Props> = ({ community }: Props) => {
  const classes = useStyles();
  const { deleteCommunity, loading, refetch } = useCommunitiesContext();
  const { isOpen, close, toggle } = useIsOpen();

  const onClickDelete = useCallback(async () => {
    await deleteCommunity({ variables: { id: community.id } });
  }, [deleteCommunity, community]);

  useEffect(() => {
    refetch();
  }, [loading, refetch]);

  return (
    <>
      <Card className={classes.root}>
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
        <CardActions>
          <Button size="small" color="primary" onClick={toggle}>
            Edit
          </Button>
          <Button size="small" color="primary" onClick={onClickDelete}>
            Delete
          </Button>
        </CardActions>
      </Card>
      <FormDialog isOpen={isOpen} close={close} toggle={toggle} community={community} />
    </>
  );
};

export default CommunityCard;

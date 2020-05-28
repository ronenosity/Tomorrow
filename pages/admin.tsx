import React from 'react';
import { map } from 'lodash';
import { Grid, LinearProgress } from '@material-ui/core';
import EnhancedPage from '../components/blocks/enhaced-page';
import AdminRoleListener from '../components/listeners/admin-role';
import { useCommunitiesContext } from '../components/contexts/communities';
import CommunityCard from '../components/blocks/community-card';
import NewEditCommunity from '../components/blocks/new-edit-community';

const AdminPage: React.FC = () => {
  const { communities } = useCommunitiesContext();
  return (
    <EnhancedPage>
      <AdminRoleListener />
      <NewEditCommunity />
      <Grid container spacing={2}>
        {map(communities, community => (
          <Grid item key={community.id}>
            <CommunityCard community={community} />
          </Grid>
        ))}
      </Grid>
    </EnhancedPage>
  );
};

export default AdminPage;

import React from 'react';
import { map } from "lodash";
import { Grid } from "@material-ui/core";
import styled from 'styled-components';
import CommunityCard from "../community-card";
import { useCommunitiesContext } from "../../contexts/communities";

const Container = styled.div`
  padding: 15px 80px;
  display: flex;
  align-content: flex-start;
`;

const AllCommunities = () => {
  const { communities } = useCommunitiesContext();
  return (
    <Container>
      <Grid container spacing={5}>
        {map(communities, community => (
          <Grid item key={community.id}>
            <CommunityCard community={community} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AllCommunities;

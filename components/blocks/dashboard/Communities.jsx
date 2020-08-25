import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import {isEmpty, map, pickBy} from "lodash";
import Typography from "@material-ui/core/Typography";
import { scheme } from '../../../lib/theme';

import Community from './Community';
import useSubscribedCommunities from "../../../hooks/useSubscribedCommunities";

const Container = styled.div`
  grid-area: communities;
  overflow-y: auto;
  border-right: 1px solid ${scheme.gray[4]};
`;

export const ALL_COMMUNITIES_QUERY = gql`
  query ALL_COMMUNITIES_QUERY {
    categories {
      id
      name
    }
  }
`;

const Communities = () => {
  const communities = useSubscribedCommunities();
  return (
    <Container>
      <Query query={ALL_COMMUNITIES_QUERY}>
        {({ loading, error, data: { categories } }) => {
          if (error) return <div>Error loading posts</div>;
          if (loading) return <div>loading...</div>;
          return (
            map(categories, category => {
              const community = pickBy(communities, {'category': category.name});
              if (isEmpty(community)) return;
                return (
                  <div style={{ padding: 5 }}>
                    <Typography variant="h4">{category.name}</Typography>
                    {map(community, c => (<Community key={c.id} community={c} />))}
                  </div>
                );
            })
          );
        }}
      </Query>
    </Container>
  );
};

export default Communities;

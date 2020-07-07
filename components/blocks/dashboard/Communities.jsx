import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import {sortBy, map, find, pickBy} from "lodash";
import { scheme } from '../../../lib/theme';

import Community from './Community';
import Typography from "@material-ui/core/Typography";

const Container = styled.div`
  grid-area: communities;
  overflow-y: auto;
  border-right: 1px solid ${scheme.gray[4]};
`;

export const ALL_COMMUNITIES_QUERY = gql`
  query ALL_COMMUNITIES_QUERY {
    communities {
      id
      name
      description
      category
      slug
      picture
      likes
      threads_count
    }
    categories {
      id
      name
    }  
  }
`;

const Communities = () => {
  return (
    <Container>
      <Query query={ALL_COMMUNITIES_QUERY}>
        {({ loading, error, data: { communities, categories } }) => {
          if (error) return <div>Error loading posts</div>;
          if (loading) return <div>loading...</div>;
          return (
            map(categories, category => {
              const community = pickBy(communities, {'category': category.name});
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

import React from 'react';
import {map, pickBy, isEmpty} from "lodash";
import styled from 'styled-components';
import { Link } from '../../../routes';
import CommunityCard from "../community-card";
import { useCommunitiesContext } from "../../contexts/communities";
import {useCategoriesContext} from "../../contexts/categories";

const Container = styled.div`
  padding: 15px 50px;
`;

const Box = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const AllCommunities = () => {
  const { communities } = useCommunitiesContext();
  const { categories } = useCategoriesContext();

  return (
    <Container>
      {map(categories, category => {
        const community = pickBy(communities, {'category': category.name});
        if (isEmpty(community)) return;
        return (
          <div>
            <h1>{category.name}</h1>
            <Box>
              {map(community, c => (
                <div style={{padding: 5}}>
                  <CommunityCard community={c} />
                </div>
                ))}
            </Box>
          </div>
        );
      })}
    </Container>
  );
};

export default AllCommunities;

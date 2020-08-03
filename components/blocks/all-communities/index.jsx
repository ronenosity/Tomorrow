import React from 'react';
import {map, pickBy} from "lodash";
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
        return (
          <div>
            <h1>{category.name}</h1>
            <Box>
              {map(community, c => (
                <Link Link route="dashboard" params={{ c: c.slug }}>
                  <div style={{padding: 5}}>
                    <CommunityCard community={c} />
                  </div>
                </Link>
                ))}
            </Box>
          </div>
        );
      })}
    </Container>
  );
};

export default AllCommunities;

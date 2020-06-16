import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import { get } from 'lodash';
import { scheme } from '../../../lib/theme';

import Auth from '../shared/auth/auth.component';
import NewThread from './NewThread';

import ThreadPlaceholder from './ThreadPlaceholder';
import ThreadList from './ThreadList';

const Container = styled.div`
  grid-area: threads;
  overflow-y: auto;
  border-right: 1px solid ${scheme.gray[4]};
`;

const Header = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  height: 50px;
  background-color: ${scheme.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  /* box-shadow: 0px 5px 5px 0 rgba(0, 0, 0, 0.08); */
  border-bottom: 1px solid ${scheme.gray[4]};
  z-index: 10;
`;

const CommunityName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-transform: uppercase;
  font-size: 1.3rem;
  color: ${scheme.gray[6]};

  span {
    font-weight: 600;
    margin-right: 5px;
    color: ${scheme.gray[8]};
  }
`;

export const THREADS_BY_COMMUNITY_QUERY = gql`
  query THREADS_BY_COMMUNITY_QUERY($community: String!, $sort: String!, $sortOrder: String!) {
    threadsByCommunity(slug: $community, sort: $sort, sortOrder: $sortOrder) {
      id
      title
      content
      date
      slug
      createdAt
      replies_count
      users_replying
      likes
      dislikes
      likedBy
      deslikedBy
      community {
        id
        slug
      }
      author {
        username
        name
        lastName
        avatar
        stars
      }
    }
  }
`;

const COMMUNITY_NAME_QUERY = gql`
  query COMMUNITY_NAME_QUERY($community: String!) {
    community(slug: $community) {
      name
    }
  }
`;

const Threads = ({ community }) => {
  const [sort, setSort] = React.useState('updatedAt');
  const [sortOrder, setSortOrder] = React.useState('desc');

  const byEvent = () => {
    setSort('date');
    setSortOrder('asc');
  };
  const latest = () => {
    setSort('updatedAt');
    setSortOrder('desc');
  };

    return (
      <Container>
        <Header>
          <Query query={COMMUNITY_NAME_QUERY} variables={{ community }}>
            {({ loading, error, data: { response } }) => {
              if (error || !community) return <div>Error loading community name</div>;
              if (loading) return <div>Loading community name</div>;
              return (
                <>
                  <CommunityName>
                    <span>{get(response, 'name')}</span> community threads
                  </CommunityName>
                  <button onClick={latest}>LATEST</button>
                  <button onClick={byEvent}>BY EVENT DATE</button>
                </>
              );
            }}
          </Query>
        </Header>
        <Auth>
          {({ data: { auth } }) => {
            if (auth) return <NewThread community={community} />;
            return null;
          }}
        </Auth>
        <Query
          query={THREADS_BY_COMMUNITY_QUERY}
          variables={{
            community,
            sort,
            sortOrder,
          }}
        >
          {({ loading, error, data, refetch }) => {
            if (error || !data) return <div>Error loading posts</div>;
            if (loading) return <ThreadPlaceholder />;
            return <ThreadList threads={data.threadsByCommunity} refetch={refetch} />;
          }}
        </Query>
      </Container>
    );
};

export default Threads;

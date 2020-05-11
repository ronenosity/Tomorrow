import React, { Component } from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import { scheme } from '../../lib/theme';

import Auth from '../shared/auth/auth.component';
import Thread from './thread-preview.component';
import NewThread from './new-thread.component';
import PenIcon from '../shared/svg/pen.icon';

import ThreadPlaceholder from './thread-placeholder.component';
import ThreadList from './thread-list.component';
import { get } from 'lodash';

const Threads = styled.div`
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
      community {
        id
        slug
      }
      author {
        username
        name
        lastName
        avatar
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
export default class Editor extends Component {
    state = { sort: 'updatedAt', sortOrder: 'desc' };
    latest = () => this.setState({ sort: 'updatedAt', sortOrder: 'desc' });
    byEvent = () => this.setState({ sort: 'date', sortOrder: 'asc' });

    render() {
        return (
            <Threads>
                <Header>
                    <Query
                        query={COMMUNITY_NAME_QUERY}
                        variables={{community: this.props.community}}
                    >
                        {({loading, error, data: {community}}) => {
                            if (error || !community) return <div>Error loading community name</div>;
                            if (loading) return <div>Loading community name</div>;
                            return (
                                <>
                                    <CommunityName>
                                        <span>{get(community, 'name')}</span> community threads
                                    </CommunityName>
                                    <button onClick={this.latest}>LATEST</button>
                                    <button onClick={this.byEvent}>BY EVENT DATE</button>
                                </>
                            );
                        }}
                    </Query>
                </Header>
                <Auth>
                    {({data: {auth}}) => {
                        if (auth) return <NewThread community={this.props.community}/>;
                        return null;
                    }}
                </Auth>
                <Query
                    query={THREADS_BY_COMMUNITY_QUERY}
                    variables={
                        {
                            community: this.props.community,
                            sort: this.state.sort,
                            sortOrder: this.state.sortOrder,
                        }
                    }

                >
                    {({loading, error, data}) => {
                        if (error || !data) return <div>Error loading posts</div>;
                        if (loading) return <ThreadPlaceholder/>;
                        return <ThreadList threads={data.threadsByCommunity}/>;
                    }}
                </Query>
            </Threads>
        );
    };
}

import gql from 'graphql-tag';

const ALL_COMMUNITIES_QUERY = gql`
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
  }
`;

export default ALL_COMMUNITIES_QUERY;

import gql from 'graphql-tag';

const ALL_CATEGORIES_QUERY = gql`
  query ALL_CATEGORIES_QUERY {
    categories {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export default ALL_CATEGORIES_QUERY;

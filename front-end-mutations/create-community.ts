import gql from 'graphql-tag';

const CREATE_COMMUNITY_MUTATION = gql`
  mutation CREATE_COMMUNITY_MUTATION($name: String!, $description: String!, $picture: String!, $category: String!) {
    createCommunity(name: $name, description: $description, picture: $picture, category: $category) {
      id
    }
  }
`;

export default CREATE_COMMUNITY_MUTATION;

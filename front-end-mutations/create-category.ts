import gql from 'graphql-tag';

const CREATE_CATEGORY_MUTATION = gql`
  mutation CREATE_CATEGORY_MUTATION($name: String!) {
    createCategory(name: $name) {
      id
    }
  }
`;

export default CREATE_CATEGORY_MUTATION;

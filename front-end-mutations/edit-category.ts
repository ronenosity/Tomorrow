import gql from 'graphql-tag';

const UPDATE_CATEGORY_MUTATION = gql`
  mutation UPDATE_CATEGORY_MUTATION($name: String!, $id: String!) {
    updateCategory(name: $name, id: $id) {
      id
    }
  }
`;

export default UPDATE_CATEGORY_MUTATION;

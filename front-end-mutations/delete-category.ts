import gql from 'graphql-tag';

const DELETE_CATEGORY_MUTATION = gql`
  mutation DELETE_CATEGORY_MUTATION($id: String!) {
    deleteCategory(id: $id) {
      id
    }
  }
`;

export default DELETE_CATEGORY_MUTATION;

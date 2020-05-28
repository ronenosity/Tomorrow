import gql from 'graphql-tag';

const DELETE_COMMUNITY_MUTATION = gql`
  mutation DELETE_COMMUNITY_MUTATION($id: String!) {
    deleteCommunity(id: $id) {
      id
    }
  }
`;

export default DELETE_COMMUNITY_MUTATION;

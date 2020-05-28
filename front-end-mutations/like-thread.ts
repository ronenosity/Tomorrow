import gql from 'graphql-tag';

const LIKE_THREAD = gql`
  mutation LIKE_THREAD($id: String!, $userId: String!) {
    likeThread(id: $id, userId: $userId) {
      id
    }
  }
`;

export default LIKE_THREAD;

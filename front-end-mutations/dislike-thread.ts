import gql from 'graphql-tag';

const DISLIKE_THREAD = gql`
  mutation DISLIKE_THREAD($id: String!, $userId: String!) {
    deslikeThread(id: $id, userId: $userId) {
      id
    }
  }
`;

export default DISLIKE_THREAD;

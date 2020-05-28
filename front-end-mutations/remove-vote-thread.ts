import gql from 'graphql-tag';

const REMOVE_VOTE_THREAD = gql`
  mutation REMOVE_VOTE_THREAD($id: String!, $userId: String!) {
    removeVoteThread(id: $id, userId: $userId) {
      id
    }
  }
`;

export default REMOVE_VOTE_THREAD;

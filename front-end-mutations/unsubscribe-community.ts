import gql from 'graphql-tag';

const UNSUBSCRIBE_COMMUNITY_MUTATION = gql`
  mutation SUBSCRIBE_COMMUNITY_MUTATION($id: String!) {
    unsubscribeCommunity(id: $id) {
      id
    }
  }
`;

export default UNSUBSCRIBE_COMMUNITY_MUTATION;

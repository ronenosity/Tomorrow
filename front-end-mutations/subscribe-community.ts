import gql from 'graphql-tag';

const SUBSCRIBE_COMMUNITY_MUTATION = gql`
  mutation SUBSCRIBE_COMMUNITY_MUTATION($id: String!) {
    subscribeCommunity(id: $id) {
      id
    }
  }
`;

export default SUBSCRIBE_COMMUNITY_MUTATION;

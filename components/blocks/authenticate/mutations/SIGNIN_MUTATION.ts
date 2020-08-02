import gql from 'graphql-tag';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticate(email: $email, password: $password) {
      id
      email
      password
      username
      avatar
      role
      createdAt
      updatedAt
      token
      accountDisabled
    }
  }
`;

export default SIGNIN_MUTATION;
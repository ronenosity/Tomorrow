import gql from 'graphql-tag';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $username: String!
    $password: String!
    $name: String!
    $lastName: String!
  ) {
    createUser(email: $email, username: $username, password: $password, name: $name, lastName: $lastName) {
      id
      email
      password
      username
      name
      lastName
      avatar
      role
      createdAt
      updatedAt
      token
      accountDisabled
    }
  }
`;

export default SIGNUP_MUTATION;
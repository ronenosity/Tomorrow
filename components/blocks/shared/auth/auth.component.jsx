import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { isEmpty } from 'lodash';

const AUTH_QUERY = gql`
  query AUTH {
    auth {
      id
      email
      username
      avatar
      role
      accountDisabled
      stars
    }
  }
`;

export default props => {
  return (
    <Query query={AUTH_QUERY}>
      {payload => {
        if (isEmpty(payload.data)) return null;
        return props.children(payload);
      }}
    </Query>
  );
};

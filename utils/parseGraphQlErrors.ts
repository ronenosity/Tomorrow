import { GraphQLError } from 'graphql';
import { get, map } from 'lodash';

const parseGraphQlErrors = (error: GraphQLError): string[] => {
  const rawErrors = map(get(error, 'graphQLErrors'), ({ message }) => message);
  return map(rawErrors, err => JSON.parse(err).message);
};

export default parseGraphQlErrors;

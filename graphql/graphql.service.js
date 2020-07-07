import { GraphQLSchema, GraphQLObjectType } from 'graphql';

// QUERIES
import { AuthQuery } from './queries/auth.query';
import { UserQuery } from './queries/user.query';
import { UsersQuery } from './queries/users.query';
import { CommunityQuery } from './queries/community.query';
import { CommunitiesQuery } from './queries/communities.query';
import { ThreadsByCommunityQuery } from './queries/threads-by-community.query';
import { ThreadQuery } from './queries/thread.query';
import { RepliesByThreadQuery } from './queries/replies-by-thread.query';
import { CategoriesQuery } from "./queries/categories.query";
// MUTATIONS
import { AuthenticateMutation } from './mutations/authenticate.mutation';
import { LogoutMutation } from './mutations/logout.mutation';
import { CreateUser } from './mutations/create-user.mutation';
import { CreateCategory } from './mutations/create-category.mutation';
import { UpdateUser } from './mutations/update-user.mutation';
import { UpdatePassword } from './mutations/update-password.mutation';
import { CreateCommunity } from './mutations/create-community.mutation';
import { EditCommunity } from './mutations/edit-community.mutation';
import { DeleteCommunity } from './mutations/delete-community.mutation';
import { CreateThread } from './mutations/create-thread.mutation';
import { LikeThread } from './mutations/like-thread.mutation';
import { RemoveVoteThread } from './mutations/remove-vote-thread.mutation';
import { DeslikeThread } from './mutations/deslike-thread.mutation';
import { CreateReply } from './mutations/create-reply.mutation';

/**
 * GraphQL Service
 * @param {Object} An object containing: Configuration, Authentication Service and Mongoose DB Access Layer
 */
const GraphQLService = () => {
  /**
   * Object for the GraphQL Query Layer
   */
  const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: '...',

    fields: () => ({
      auth: AuthQuery(),
      user: UserQuery(),
      users: UsersQuery(),
      community: CommunityQuery(),
      communities: CommunitiesQuery(),
      threadsByCommunity: ThreadsByCommunityQuery(),
      thread: ThreadQuery(),
      repliesByThread: RepliesByThreadQuery(),
      categories: CategoriesQuery(),
    }),
  });

  /**
   * Object for the GraphQL Mutation layer
   */
  const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: '...',

    fields: () => ({
      /* Creation Mutations  */
      authenticate: AuthenticateMutation(),
      logout: LogoutMutation(),
      createUser: CreateUser(),
      createCommunity: CreateCommunity(),
      editCommunity: EditCommunity(),
      deleteCommunity: DeleteCommunity(),
      createThread: CreateThread(),
      likeThread: LikeThread(),
      deslikeThread: DeslikeThread(),
      removeVoteThread: RemoveVoteThread(),
      createReply: CreateReply(),
      createCategory: CreateCategory(),
      /* Update Mutations */
      updateUser: UpdateUser(),
      updatePassword: UpdatePassword(),
      /* Delete Mutations */
    }),
  });

  return new GraphQLSchema({
    query: QueryType,
    mutation: MutationType,
  });
};

export { GraphQLService };

import { GraphQLError, GraphQLString } from 'graphql';
import { ThreadType } from '../types/thread.type';
import { Response, MISSING_PARAMETERS } from '../utils/responses.utils';

export const RemoveVoteThread = () => ({
  type: ThreadType,
  args: {
    id: { type: GraphQLString },
    userId: { type: GraphQLString },
  },
  resolve: (root, { id, userId }, ctx) => {
    const { headers, loaders, security, db } = ctx;
    return security.ensureAuthenticated(ctx.request.cookies.token).then(async authData => {
      if (!id || id === '' || !userId || userId === '') {
        return MISSING_PARAMETERS;
      }
      let thread;
      try {
        thread = await db.thread.findOneAndUpdate(
          {
            _id: id,
          },
          {
            $pull: { likedBy: userId.toString(), deslikedBy: userId.toString() },
          },
        );
      } catch (error) {
        return GraphQLError(
          Response({
            status: 500,
            message: `An error ocurred while removing vote the thread.`,
          }),
        );
      }
      return thread.toObject();
    }, security.onRejectedAuthentication);
  },
});

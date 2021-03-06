import { GraphQLError, GraphQLString } from 'graphql';
import { ThreadType } from '../types/thread.type';
import { Response, MISSING_PARAMETERS } from '../utils/responses.utils';

export const LikeThread = () => ({
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
      let stars;
      const user = await db.user.findById(authData.identifier);
      try {
        thread = await db.thread.findOneAndUpdate(
          {
            _id: id,
          },
          {
            $addToSet: { likedBy: userId.toString() },
            $pull: { deslikedBy: userId.toString() },
          },
        );
        stars = await user.update({
          stars: user.stars + 1
        });
      } catch (error) {
        return GraphQLError(
          Response({
            status: 500,
            message: `An error ocurred while liking the thread.`,
          }),
        );
      }
      return thread.toObject();
    }, security.onRejectedAuthentication);
  },
});

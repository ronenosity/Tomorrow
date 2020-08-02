import { GraphQLError, GraphQLString, GraphQLNonNull } from 'graphql';
import { ReplyType } from '../types/reply.type';
import { Response, UNEXPECTED_ERROR, MISSING_PARAMETERS } from '../utils/responses.utils';

export const CreateReply = () => ({
  type: ReplyType,
  args: {
    thread: { type: GraphQLNonNull(GraphQLString) },
    content: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve: (root, { thread, content }, ctx) => {
    const { headers, loaders, security, db } = ctx;
    return security.ensureAuthenticated(ctx.request.cookies.token).then(async authData => {
      if (!thread || thread === '' || !content || content === '') {
        return MISSING_PARAMETERS;
      }
      let reply;
      let user;
      let stars;
      try {
        user = await db.user.findById(authData.identifier);
        reply = await db.reply.create({
          thread,
          author: authData.identifier,
          content,
        });
        stars = await user.update({
          stars: user.stars + 3
        });
      } catch (error) {
        return GraphQLError(
          Response({
            status: 500,
            message: `An error ocurred while creating the reply.`,
          }),
        );
      }
      return reply.toObject();
    }, security.onRejectedAuthentication);
  },
});

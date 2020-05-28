import { GraphQLString, GraphQLNonNull } from 'graphql';
import { CommunityType } from '../types/community.type';
import { UNEXPECTED_ERROR, MISSING_PARAMETERS } from '../utils/responses.utils';

export const DeleteCommunity = () => ({
  type: CommunityType,
  args: {
    id: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve: (root, { id }, ctx) => {
    const { headers, loaders, security, db } = ctx;
    return security.ensureAuthenticated(ctx.request.cookies.token).then(async authData => {
      if (!id || id === '') {
        return MISSING_PARAMETERS;
      }
      try {
        await db.community.findOneAndDelete({ _id: id });
        return { message: `success deleting community ${id}`, _id: id };
      } catch (error) {
        return UNEXPECTED_ERROR;
      }
    }, security.onRejectedAuthentication);
  },
});

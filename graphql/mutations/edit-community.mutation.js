import { GraphQLString, GraphQLNonNull, GraphQLError } from 'graphql';
import { CommunityType } from '../types/community.type';
import { UNEXPECTED_ERROR, MISSING_PARAMETERS, Response } from '../utils/responses.utils';
import { string_to_slug } from '../utils/general.utils';

export const EditCommunity = () => ({
  type: CommunityType,
  args: {
    name: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLNonNull(GraphQLString) },
    picture: { type: GraphQLNonNull(GraphQLString) },
    category: { type: GraphQLNonNull(GraphQLString) },
    id: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve: (root, { name, description, picture, id, category }, ctx) => {
    const { headers, loaders, security, db } = ctx;
    return security.ensureAuthenticated(ctx.request.cookies.token).then(async authData => {
      if (
        !name ||
        name === '' ||
        !description ||
        description === '' ||
        !picture ||
        picture === '' ||
        !id ||
        id === ''
      ) {
        return MISSING_PARAMETERS;
      }
      const possibleSlug = string_to_slug(name);
      let existentSlug;
      try {
        existentSlug = await db.community.findOne({ slug: possibleSlug });
      } catch (error) {
        return UNEXPECTED_ERROR;
      }

      // eslint-disable-next-line no-underscore-dangle
      if (existentSlug && existentSlug.toObject()._id.toString() !== id) {
        return new GraphQLError(
          Response({
            status: 500,
            message: `A community cannot be edited with that name, there's already an existent community`,
          }),
        );
      }
      try {
        await db.community.findOneAndUpdate(
          { _id: id },
          {
            name,
            description,
            picture,
            category,
          },
        );
        const community = await db.community.findOne({ _id: id });
        return community.toObject();
      } catch (error) {
        return UNEXPECTED_ERROR;
      }
    }, security.onRejectedAuthentication);
  },
});

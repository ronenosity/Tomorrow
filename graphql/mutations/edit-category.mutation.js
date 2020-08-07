import { GraphQLString, GraphQLNonNull, GraphQLError } from 'graphql';
import { UNEXPECTED_ERROR, MISSING_PARAMETERS, Response } from '../utils/responses.utils';
import {CategoryType} from "../types/category.type";

export const EditCategory = () => ({
  type: CategoryType,
  args: {
    name: { type: GraphQLNonNull(GraphQLString) },
    id: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve: (root, { name, id }, ctx) => {
    const { headers, loaders, security, db } = ctx;
    return security.ensureAuthenticated(ctx.request.cookies.token).then(async authData => {
      if (
        !name ||
        name === '' ||
        !id ||
        id === ''
      ) {
        return MISSING_PARAMETERS;
      }
      let existentCategory;
      try {
        existentCategory = await db.category.findOne({ name });
      } catch (error) {
        return UNEXPECTED_ERROR;
      }

      // eslint-disable-next-line no-underscore-dangle
      if (existentCategory) {
        return new GraphQLError(
          Response({
            status: 500,
            message: `This category already exists`,
          }),
        );
      }
      try {
        const category = await db.category.findOneAndUpdate(
          { _id: id },
          {
            name,
          },
        );
        await db.community.updateMany({
          category: category.name
        }, {
          category: name
        });
        return category;
      } catch (error) {
        return UNEXPECTED_ERROR;
      }
    }, security.onRejectedAuthentication);
  },
});

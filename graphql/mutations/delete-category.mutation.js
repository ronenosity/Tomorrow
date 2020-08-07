import { GraphQLString, GraphQLNonNull } from 'graphql';
import { UNEXPECTED_ERROR, MISSING_PARAMETERS } from '../utils/responses.utils';
import { CategoryType } from "../types/category.type";

export const DeleteCategory = () => ({
  type: CategoryType,
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
        const category = await db.category.findOneAndDelete({ _id: id });
        await db.community.updateMany({
          category: category.name,
        }, {
          category: 'No Category'
        });
        return { message: `success deleting category ${id}`, _id: id };
      } catch (error) {
        return UNEXPECTED_ERROR;
      }
    }, security.onRejectedAuthentication);
  },
});

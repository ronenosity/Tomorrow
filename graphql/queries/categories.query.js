import { GraphQLList } from 'graphql';
import { CategoryType } from '../types/category.type';

export const CategoriesQuery = () => ({
  type: GraphQLList(CategoryType),
  resolve: async (root, args, { loaders, db }) => {
    const categories = await db.category.find();
    await loaders.category.cache(categories);
    return categories;
  },
});

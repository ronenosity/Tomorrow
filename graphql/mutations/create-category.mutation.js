import { GraphQLError, GraphQLString } from 'graphql';
import { CategoryType } from '../types/category.type';
import { Response, UNEXPECTED_ERROR, MISSING_PARAMETERS } from '../utils/responses.utils';

export const CreateCategory = () => ({
    type: CategoryType,
    args: {
        name: { type: GraphQLString },
    },
    resolve: async (root, args, ctx) => {
        const { db } = ctx;
        if (
            !args.name ||
            args.name === ''
        ) {
            return MISSING_PARAMETERS;
        }
        let exists;
        try {
            exists = await db.category.findOne({ name: args.name });
        } catch (error) {
            return UNEXPECTED_ERROR;
        }
        if (exists) {
            return new GraphQLError(
                Response({ status: 500, message: `An category could not be created with the given data.` }),
            );
        }
        let category;
        try {
            category = await db.category.create({
                name: args.name,
            });
        } catch (error) {
            return new GraphQLError(
                Response({
                    status: 500,
                    message: `An error ocurred while creating the category.`,
                }),
            );
        }
    },
});

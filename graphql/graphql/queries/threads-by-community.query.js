import { GraphQLList, GraphQLNonNull, GraphQLString, GraphQLError } from 'graphql';
import { Response } from '../utils/responses.utils';
import { ThreadType } from '../types/thread.type';

export const ThreadsByCommunityQuery = () => ({
  type: GraphQLList(ThreadType),
  args: {
    community: { type: GraphQLString },
    slug: { type: GraphQLString },
    filter: { type: GraphQLString },
    sort: { type: GraphQLString },
    sortOrder: { type: GraphQLString },
  },
  resolve: async (root, { community, slug, filter = '', sort = 'updatedAt', sortOrder = 'desc' }, { headers, loaders, token, security, db }) => {
    // return security.ensureAuthenticated(token).then(async authData => {
    let threads;
    const mongoSort = {
      [sort]: sortOrder,
    }
    try {
      if (community) {
        threads = await db.thread
          .find({ community, title: { $regex: filter, $options: 'i' } })
          .sort(mongoSort)
          .lean();
      }
      if (slug) {
        const community = await db.community.findOne({ slug }).lean();
        threads = await db.thread
          .find({ community: community._id.toString(), title: { $regex: filter, $options: 'i' } })
          .sort(mongoSort)
          .lean();
      }
    } catch (error) {
      return new GraphQLError(
        Response({
          status: 500,
          message: `An error ocurred while retrieving this community threads.`,
        }),
      );
    }

    await loaders.thread.cache(threads);
    return threads;
    // }, security.onRejectedAuthentication);
  },
});

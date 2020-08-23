import {GraphQLString, GraphQLNonNull, GraphQLError} from 'graphql';
import { findIndex } from 'lodash';
import { CommunityType } from '../types/community.type';
import {Response} from "../utils/responses.utils";

export const SubscribeCommunity = () => ({
  type: CommunityType,
  args: {
    id: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve: (root, { id }, ctx) => {
    const { headers, loaders, security, db } = ctx;
    return security.ensureAuthenticated(ctx.request.cookies.token).then(async authData => {
      try {
        const community = await db.community.findById(id);
        community.subscriptions.push(authData.identifier);
        community.save();
        return community;
      } catch (error) {
        return GraphQLError(
          Response({
            status: 500,
            message: `An error ocurred while subscribing to community.`,
          }),
        );
      }
    }, security.onRejectedAuthentication);
  },
});

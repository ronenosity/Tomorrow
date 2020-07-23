import graphqlHTTP from 'express-graphql';
import Cors from 'cors';
import cookieParser from 'cookie-parser';
import { GraphQLService } from '../../../graphql/graphql.service';
import { Loaders } from '../../../graphql/graphql.loaders';
import { authService } from '../../../services/auth.service';
import { Security } from '../../../graphql/security/security';

// const isDev = process.env.ENV === 'development';

import cookies from '../../../cookies';

import dbConnect from '../../../database/db';
// import { config } from "../../../config";

const cors = Cors({
  methods: ['GET', 'HEAD', 'POST'],
});

dbConnect().then(() => console.log('MongoDB is Connected'));

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, result => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

const handler = graphqlHTTP(async (request, response) => {
  await runMiddleware(request, response, cookieParser());
  await runMiddleware(request, response, cors);
  // await runMiddleware(request, response, cors({
  //     // @ts-ignore
  //     exposedHeaders: config.corsHeaders,
  //     credentials: true,
  //     origin: isDev ? 'http://localhost:3000' : 'https://forum-p1vwlq731.now.sh',
  // }));
  await runMiddleware(request, response, (req, res, next) => {
    req.authorization =
      req.cookies.token || (req.headers.authorization ? req.headers.authorization.split(' ')[1] : null);
    next();
  });
  const db = {
    user: require('../../../models/user'),
    category: require('../../../models/category'),
    community: require('../../../models/community'),
    thread: require('../../../models/thread'),
    reply: require('../../../models/reply'),
    community_likes: require('../../../models/community-likes'),
  };
  const { UserLoader, CommunityLoader, ThreadLoader, ReplyLoader, CategoryLoader } = Loaders({ db });
  // Auth Service
  const auth = authService();
  const security = Security(db, auth);
  return {
    context: {
      request,
      response,
      db,
      auth,
      security,
      loaders: {
        user: UserLoader(),
        community: CommunityLoader(),
        thread: ThreadLoader(),
        reply: ReplyLoader(),
        category: CategoryLoader(),
      },
    },
    schema: GraphQLService(),
    graphiql: true,
  };
});

export default cookies(handler);

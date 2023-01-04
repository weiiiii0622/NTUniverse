import { createPubSub, createSchema, createYoga } from 'graphql-yoga';
import { createServer } from 'node:http';
import { useServer } from 'graphql-ws/lib/use/ws';
import { WebSocketServer } from 'ws';
import * as fs from 'fs';
import path from 'path';
import Schema from './schema';

import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';

import UserModel from './models/userModel';
import BulletinModel from './models/bulletinModel';
import BulletinMsgModel from './models/bulletinMsgModel';

// import { DateTimeResolver } from 'graphql-scalars';
// import dateScalar from './resolvers/Date';
import Bulletin from './resolvers/Bulletin';
import BulletinMsg from './resolvers/BulletinMsg';

const pubsub = createPubSub();

const yoga = createYoga<any>({
  schema: createSchema({
    typeDefs: Schema,
    resolvers: <any>({
      Query,
      Mutation,
      Subscription,
      // Date: dateScalar,
      // DateTime: DateTimeResolver,
      Bulletin,
      BulletinMsg,
    }),
  }),
  context: <any>({
    UserModel,
    BulletinModel,
    BulletinMsgModel,
    pubsub,
  }),
  //  graphqlEndpoint: '/',   // uncomment this to send the app to: 4000/
  graphiql: {
    subscriptionsProtocol: 'WS',
  },
  graphqlEndpoint: '/graphql',
});

const httpServer = createServer(yoga);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/subscriptions',
})

useServer(
  {
    execute: (args) => args.rootValue.execute(args),
    subscribe: (args) => args.rootValue.subscribe(args),
    onSubscribe: async (ctx, msg) => {
      const { schema, execute, subscribe, contextFactory, parse, validate } =
        yoga.getEnveloped({
          ...ctx,
          req: ctx.extra.request,
          socket: ctx.extra.socket,
          params: msg.payload
        })

      const args = {
        schema,
        operationName: msg.payload.operationName,
        document: parse(msg.payload.query),
        variableValues: msg.payload.variables,
        contextValue: await contextFactory(),
        rootValue: {
          execute,
          subscribe
        }
      }

      const errors = validate(args.schema, args.document)
      if (errors.length) return errors
      return args
    },
  },
  wsServer,
)

export default httpServer;

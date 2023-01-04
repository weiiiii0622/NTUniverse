"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_yoga_1 = require("graphql-yoga");
const node_http_1 = require("node:http");
const ws_1 = require("graphql-ws/lib/use/ws");
const ws_2 = require("ws");
const schema_1 = __importDefault(require("./schema"));
const Query_1 = __importDefault(require("./resolvers/Query"));
const Mutation_1 = __importDefault(require("./resolvers/Mutation"));
const Subscription_1 = __importDefault(require("./resolvers/Subscription"));
const userModel_1 = __importDefault(require("./models/userModel"));
const bulletinModel_1 = __importDefault(require("./models/bulletinModel"));
const bulletinMsgModel_1 = __importDefault(require("./models/bulletinMsgModel"));
const chatRoomModel_1 = __importDefault(require("./models/chatRoomModel"));
// import { DateTimeResolver } from 'graphql-scalars';
// import dateScalar from './resolvers/Date';
const Bulletin_1 = __importDefault(require("./resolvers/Bulletin"));
const BulletinMsg_1 = __importDefault(require("./resolvers/BulletinMsg"));
const ChatRoom_1 = __importDefault(require("./resolvers/ChatRoom"));
const pubsub = (0, graphql_yoga_1.createPubSub)();
const yoga = (0, graphql_yoga_1.createYoga)({
    schema: (0, graphql_yoga_1.createSchema)({
        typeDefs: schema_1.default,
        resolvers: ({
            Query: Query_1.default,
            Mutation: Mutation_1.default,
            Subscription: Subscription_1.default,
            // Date: dateScalar,
            // DateTime: DateTimeResolver,
            Bulletin: Bulletin_1.default,
            BulletinMsg: BulletinMsg_1.default,
            ChatRoom: ChatRoom_1.default,
        }),
    }),
    context: ({
        UserModel: userModel_1.default,
        BulletinModel: bulletinModel_1.default,
        BulletinMsgModel: bulletinMsgModel_1.default,
        ChatRoomModel: chatRoomModel_1.default,
        pubsub,
    }),
    //  graphqlEndpoint: '/',   // uncomment this to send the app to: 4000/
    graphiql: {
        subscriptionsProtocol: 'WS',
    },
    graphqlEndpoint: '/graphql',
});
const httpServer = (0, node_http_1.createServer)(yoga);
const wsServer = new ws_2.WebSocketServer({
    server: httpServer,
    path: '/subscriptions',
});
(0, ws_1.useServer)({
    execute: (args) => args.rootValue.execute(args),
    subscribe: (args) => args.rootValue.subscribe(args),
    onSubscribe: (ctx, msg) => __awaiter(void 0, void 0, void 0, function* () {
        const { schema, execute, subscribe, contextFactory, parse, validate } = yoga.getEnveloped(Object.assign(Object.assign({}, ctx), { req: ctx.extra.request, socket: ctx.extra.socket, params: msg.payload }));
        const args = {
            schema,
            operationName: msg.payload.operationName,
            document: parse(msg.payload.query),
            variableValues: msg.payload.variables,
            contextValue: yield contextFactory(),
            rootValue: {
                execute,
                subscribe
            }
        };
        const errors = validate(args.schema, args.document);
        if (errors.length)
            return errors;
        return args;
    }),
}, wsServer);
exports.default = httpServer;

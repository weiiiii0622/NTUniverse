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
const apollo_server_express_1 = require("apollo-server-express");
const Schema_1 = __importDefault(require("./Schema"));
const Resolvers_1 = __importDefault(require("./Resolvers"));
const express_1 = __importDefault(require("express"));
const apollo_server_core_1 = require("apollo-server-core");
const http_1 = __importDefault(require("http"));
function startApolloServer(schema, resolvers) {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const httpServer = http_1.default.createServer(app);
        const server = new apollo_server_express_1.ApolloServer({
            typeDefs: schema,
            resolvers,
            //tell Express to attach GraphQL functionality to the server
            plugins: [(0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
        });
        yield server.start(); //start the GraphQL server.
        server.applyMiddleware({ app });
        yield new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve) //run the server on port 4000
        );
        console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
    });
}
//in the end, run the server and pass in our Schema and Resolver.
startApolloServer(Schema_1.default, Resolvers_1.default);

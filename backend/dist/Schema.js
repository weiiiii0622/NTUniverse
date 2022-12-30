"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const Schema = (0, apollo_server_express_1.gql) `
  type User {
    id: ID!
    name: String!
    picture: String!  #先用 string 到時候再改
  }

  type ChatRoom {
    users: [User!]!
    chatRoomName: String!
    messages: [Message!]
  }

  type Message {
    chatRoomName: String!
    sender: User!
    time: String! #先用 string 到時候再改
  }
  
  type Board {
    location: String! #先用 string 到時候再改
    bulletins: Bulletin!
  }

  type Bulletin {
    announcer: User!
    title: String!
    text: String!
    time: String! #先用 string 到時候再改
    tags: [String!]
  }

  type Query {
  
  }

  type Mutation {

  }

  type Subscription {

  }
`;
exports.default = Schema;
//export this Schema so we can use it in our project

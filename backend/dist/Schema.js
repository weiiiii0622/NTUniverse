"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const Schema = (0, apollo_server_express_1.gql) `
  scalar DateTime


  type User {
    id: ID!
    email: String!
    first_name: String!
    last_name: String!
    nick_name: String!
    description: String!
    picture: String!
  }

  type ChatRoom {
    id: ID!
    chatRoomName: String!
    messages: [Message]!
  }

  type Message {
    sender: String!,
    senderNick: String!,
    content: String!,
  }
  
  type Bulletin {
    location: String!
    messages: [BulletinMsg]
  }

  type BulletinMsg {
    id: ID!
    author: User!
    body: String!
    tags: [String]
    likers: [User]
  }

  type Query {
    user(id: ID!): User!
    userAll: [User!]
    userByEmail(email: String!): User!
    bulletin(location: String!): Bulletin!
    bulletinMsg(author: ID!): [BulletinMsg!]
    chatRoom(chatRoomName: String!): ChatRoom!
  }

  type Mutation {
    createUser(email: String!, first_name: String!, nick_name: String!, last_name: String!, picture: String!): User!
    updateUser(email: String!, nick_name: String!, picture: String!, description: String!): User!
    createBulletinMsg(location: String!, author: ID!, body: String!, tags:[String]): BulletinMsg!
    updateBulletinMsg(location: String!, id: ID!, email: String!, isLiked: Boolean!): BulletinMsg!
    createChatRoom(chatRoomName: String!): ChatRoom!
    createMessage(chatRoomName: String!, sender: String!, senderNick: String, content: String!): [Message]!
  }

  type Subscription {
    bulletin(location: String!): BulletinMsgSubscriptionPayload!
    newMessage(chatRoomName: String!): ChatRoom!
  }

  type BulletinMsgSubscriptionPayload {
    type: MutationType!
    data: BulletinMsg!
  }

  enum MutationType {
    CREATED
    UPDATED
    DELETED
  }
`;
exports.default = Schema;
//export this Schema so we can use it in our project

import { gql } from 'apollo-server-express';


const Schema = gql`
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
    chatRoomName: String!
    users: [User!]!
    messages: [Message!]
  }

  type Message {
    chatRoomName: String!
    sender: User!
    time: DateTime!
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
    user(name: String!): User!
    userByEmail(email: String!): User!
    bulletin(location: String!): Bulletin!
    bulletinMsg(author: ID!): [BulletinMsg!]
  }

  type Mutation {
    createUser(email: String!, first_name: String!, nick_name: String!, last_name: String!, picture: String!): User!
    updateUser(email: String!, nick_name: String!, picture: String!, description: String!): User!
    createBulletinMsg(location: String!, author: ID!, body: String!, tags:[String]): BulletinMsg!
    updateBulletinMsg(location: String!, id: ID!, email: String!, isLiked: Boolean!): BulletinMsg!
  }

  type Subscription {
    bulletin(location: String!): BulletinMsgSubscriptionPayload!
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
export default Schema;
//export this Schema so we can use it in our project
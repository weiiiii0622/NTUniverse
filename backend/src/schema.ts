import { gql } from 'apollo-server-express';

const Schema = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    picture: String!  #先用 string 到時候再改
  }

  type ChatRoom {
    chatRoomName: String!
    users: [User!]!
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
    user(name: String!): User!
    userByEmail(email: String!): User!
  }

  # type Mutation {

  # }

  # type Subscription {

  # }
`;
export default Schema; 
//export this Schema so we can use it in our project
import { gql } from '@apollo/client';

const USER_QUERY = gql`
  query user(
    $id: ID!
  ){
    user(id: $id){
      description
      email
      first_name
      id
      nick_name
      last_name
      picture  
    }
  }
`;

const USERALL_QUERY = gql`
  query{
    userAll{
      description
      email
      first_name
      id
      nick_name
      last_name
      picture  
    }
  } 
`;

const BULLETIN_QUERY = gql`
  query bulletin(
    $location: String!
  ){
    bulletin(location: $location){
        location
        messages {
            id
            body
            tags
            author {
                id
                email
                nick_name
                description
                first_name
                last_name
                picture
            }
            likers{
              id
            }
        }
    }
  }
`;

const CHATROOM_QUERY = gql`
  query chatRoom ($chatRoomName: String!){
    chatRoom(chatRoomName: $chatRoomName) {
      id
      chatRoomName
      messages {
        sender
        senderNick
        content
      }
    }
  } 
`;

export { USER_QUERY, USERALL_QUERY, BULLETIN_QUERY, CHATROOM_QUERY };
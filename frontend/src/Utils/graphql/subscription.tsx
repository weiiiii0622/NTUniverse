import { gql } from '@apollo/client';

const BULLETIN_SUBSCRIPTION = gql`
  subscription bulletin(
    $location: String!,
  ){
    bulletin(location: $location){
      type
      data{
        id
        body
        tags
        likers {
          id
        }
        author {
            id
            email
            nick_name
            description
            first_name
            last_name
            picture
        }     
      }
    }
  }
`;

const NEWMESSAGE_SUBSCRIPTION = gql`
  subscription newMessage($chatRoomName: String!){
    newMessage(chatRoomName: $chatRoomName) {
        sender
        content
        readBy
    }
  }
`;

export { BULLETIN_SUBSCRIPTION, NEWMESSAGE_SUBSCRIPTION };
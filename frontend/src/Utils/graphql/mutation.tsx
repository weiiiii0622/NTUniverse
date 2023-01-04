import { gql } from '@apollo/client';

const CREATE_USER_MUTATION = gql`
  mutation createUser(
    $email: String!,
    $first_name: String!,
		$nick_name: String!,
    $last_name: String!,
    $picture: String!,
  ){
    createUser(email: $email, first_name: $first_name, last_name: $last_name, nick_name: $nick_name, picture: $picture){
			id,
			email,
			first_name,
			last_name,
			nick_name,
			picture,
			description
    }
  }
`;

const UPDATE_USER_MUTATION = gql`
  mutation updateUser(
    $email: String!,
    $nick_name: String!,
    $picture: String!,
    $description: String!,
  ){
    updateUser(email: $email, nick_name: $nick_name, picture: $picture, description: $description){
      id,
			email,
      first_name,
      last_name,
      nick_name,
      picture,
      description
    }
  }
`;

const CREATE_BULLETINMSG_MUTATION = gql`
  mutation createBulletinMsg(
    $location: String!, 
    $author: ID!, 
    $body: String!,
    $tags:[String]
  ){
    createBulletinMsg(location: $location, author: $author, body: $body, tags: $tags){
      author {
        id
        nick_name
      }
      id
      body
      tags
    }
  }
`;

const UPDATE_BULLETINMSG_MUTATION = gql`
  mutation createBulletinMsg(
    $location: String!,
    $id: ID!,
    $email: String!,
    $isLiked: Boolean!
  ){
    updateBulletinMsg(location: $location, id: $id, email: $email, isLiked: $isLiked) {
      body
      id
      tags
      likers {
        id
        nick_name
      }
    }
  }

`;

const CREATE_CHATROOM_MUTATION = gql`
  mutation createChatBox(
    $chatRoomName: String!, 
  ){
    createChatRoom(chatRoomName: $chatRoomName) {
      id
    }
  }
`;

const CREATE_MRSSAGE_MUTATION = gql`
  mutation createMessage(
    $chatRoomName: String!,
    $sender: String!,
    $content: String!,
  ){
  createMessage(chatRoomName: $chatRoomName, sender: $sender, content: $content){
    sender
    content
  }
}
`;

export { CREATE_USER_MUTATION, UPDATE_USER_MUTATION, CREATE_BULLETINMSG_MUTATION, UPDATE_BULLETINMSG_MUTATION, CREATE_CHATROOM_MUTATION, CREATE_MRSSAGE_MUTATION };
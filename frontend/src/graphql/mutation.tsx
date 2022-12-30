import { gql } from '@apollo/client';

const CREATE_USER_MUTATION = gql`
  mutation createUser(
    $email: String!,
    $first_name: String!,
    $last_name: String!,
    $picture: String!,
  ){
    createUser(email: $email, first_name: $first_name, last_name: $last_name, picture: $picture){
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
      email,
      first_name,
      last_name,
      nick_name,
      picture,
      description
    }
  }
`;

export {CREATE_USER_MUTATION, UPDATE_USER_MUTATION};
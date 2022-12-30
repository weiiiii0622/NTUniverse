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
      picture
    }
  }
`;

export {CREATE_USER_MUTATION};
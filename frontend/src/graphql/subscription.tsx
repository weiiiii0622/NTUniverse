import { gql } from '@apollo/client';

const BULLETIN_SUBSCRIPTION = gql`
  subscription bulletin(
    $location: String!,
  ){
    bulletin(location: $location){
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
    }
  }
`;

export { BULLETIN_SUBSCRIPTION };
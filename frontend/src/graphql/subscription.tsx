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

export { BULLETIN_SUBSCRIPTION };
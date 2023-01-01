import { gql } from '@apollo/client';

const BULLETIN_QUERY = gql`
  query bulletin(
    $location: String!
  ){
    bulletin(location: $location){
        location
        messages {
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
  }
`;

export { BULLETIN_QUERY };
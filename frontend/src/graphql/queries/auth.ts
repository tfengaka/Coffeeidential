import { gql } from '@apollo/client';

export const GET_USER_BY_ID = gql`
  query ($id: uuid!) {
    user: customers_by_pk(id: $id) {
      id
      fullName
      description
      email
      phoneNumber
      avatar
      banner
      address
    }
  }
`;

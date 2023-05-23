import { gql } from '@apollo/client';

export const GET_OWN_PRODUCTS = gql`
  query ($owner: uuid!) {
    products(where: { creator: { id: { _eq: $owner } } }) {
      id
      name
      production
      gtinCode
      price
      sellingUnitId
      description
      expireUnitId
      expireTime
      images
      introVideo
      createdAt
    }
  }
`;

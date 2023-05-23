import { gql } from '@apollo/client';

export const CREATE_PRODUCT = gql`
  mutation ($product: products_insert_input!) {
    product: insert_products_one(object: $product) {
      id
      name
      typeId
      gtinCode
      description
      images
      introVideo
      price
      production
      sellingUnitId
      expireTime
      expireUnitId
      totalScans
      createdAt
      createdBy
    }
  }
`;

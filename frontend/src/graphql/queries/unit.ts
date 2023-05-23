import { gql } from '@apollo/client';

export const GET_UNIT_DATA = gql`
  query ($type: String!) {
    data: master_data(where: { type: { _eq: $type } }) {
      value: data
    }
  }
`;

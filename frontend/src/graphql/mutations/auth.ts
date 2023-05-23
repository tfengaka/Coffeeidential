import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation ($form: FormSignIn!) {
    authToken: signIn(form: $form) {
      token
      refreshToken
    }
  }
`;

export const SIGN_UP = gql`
  mutation ($form: FormSignUp!) {
    authToken: signUp(form: $form) {
      token
      refreshToken
    }
  }
`;

export const UPDATE_DATA = gql`
  mutation ($id: uuid!, $data: customers_set_input) {
    updated: update_customers_by_pk(pk_columns: { id: $id }, _set: $data) {
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

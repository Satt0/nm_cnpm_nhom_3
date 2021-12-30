
import { gql } from "@apollo/client";


export const DANG_NHAP = gql`
query LogIn($input: inputLogin!) {
  logIn(input: $input) {
    ID
    username
    role
    token
  }
}
`;

export const DANG_KY=gql`
mutation SignUp($input: inputSignup!){
  signUp(input: $input) {
    ID
    role
    token
    username
    __typename
  }
}
`

import { gql } from "graphql-tag";

export const XOA_TAM_VANG = gql`
  mutation XoaTamVang($input: Int!) {
  xoaTamVang(input: $input)
}
`;
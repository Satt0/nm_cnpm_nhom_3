import { gql } from "graphql-tag";

export const XOA_TAM_TRU = gql`
  mutation XoaTamTru($input: Int!) {
  xoaTamTru(input: $input)
}
`;
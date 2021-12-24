
import { gql } from "@apollo/client";
export const XOA_THE_DINH_DANH = gql`
mutation XoaTheDinhDanh($input: Int!) {
  xoaTheDinhDanh(input: $input)
}
`;
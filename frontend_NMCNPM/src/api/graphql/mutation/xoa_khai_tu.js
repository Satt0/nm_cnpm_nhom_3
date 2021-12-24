import { gql } from "graphql-tag";

export const XOA_KHAI_TU = gql`
  mutation XoaKhaiTu($input: Int!) {
  xoaKhaiTu(input: $input)
}
`;
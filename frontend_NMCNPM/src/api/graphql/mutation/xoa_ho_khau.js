import { gql } from "@apollo/client";

export const XOA_HO_KHAU = gql`
mutation XoaHoKhau($input: Int!) {
  xoaHoKhau(input: $input)
}
`;

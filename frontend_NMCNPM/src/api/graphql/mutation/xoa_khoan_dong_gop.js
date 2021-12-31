import { gql } from "@apollo/client";
export const XOA_KHOAN_DONG_GOP = gql`
  mutation XoaKhoanDongGop($input: Int!) {
  xoaKhoanDongGop(input: $input)
}
`;
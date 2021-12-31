import { gql } from "@apollo/client";

export const XOA_THANH_VIEN = gql`
mutation XoaThanhVienGiaDinh($input: inputXoaKhau!) {
  xoaThanhVienGiaDinh(input: $input)
}
`;

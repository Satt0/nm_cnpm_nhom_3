
import { gql } from "@apollo/client";

export const CAP_NHAT_HO_KHAU = gql`
  mutation CapNhatHoKhau($input: inputCapNhatHoKhau!) {
  capNhatHoKhau(input: $input) {
    ID
  }
}
`;

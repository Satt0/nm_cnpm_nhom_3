
import { gql } from "@apollo/client";

export const CAP_NHAT_THANH_VIEN = gql`
  mutation CapNhatThanhVien($input: inputSuaKhau!) {
  capNhatThanhVien(input: $input) {
    quanHeVoiChuHo
  }
}
`;

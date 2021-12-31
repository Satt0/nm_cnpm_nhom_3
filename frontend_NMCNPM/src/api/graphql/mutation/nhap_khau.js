import { gql } from "@apollo/client";

export const NHAP_KHAU = gql`
  mutation NhapKhau($input: inputNhapKhau!) {
  nhapKhau(input: $input) {
    nhanKhau {
      ID
      hoTen
      namSinh
      gioiTinh
    }
    quanHeVoiChuHo
  }
}
`;

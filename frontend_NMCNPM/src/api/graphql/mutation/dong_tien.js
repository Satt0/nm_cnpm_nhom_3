import { gql } from "@apollo/client";
export const DONG_TIEN = gql`
  mutation DongTien($input: inputKhoanThu!) {
  dongTien(input: $input) {
    daDong
    ngayDong
    hoKhau {
      ID
      maHoKhau
      chuHo {
        ID
        hoTen
        namSinh
      }
    }
  }
}
`;
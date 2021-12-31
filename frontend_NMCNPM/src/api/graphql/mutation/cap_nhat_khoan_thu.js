import { gql } from "@apollo/client";
export const CAP_NHAT_KHOAN_THU = gql`
  mutation CapNhatKhoanThu($input: inputCapNhatDaThu) {
  capNhatKhoanThu(input: $input) {
    daDong
    ngayDong
    hoKhau {
      ID
      maHoKhau
      chuHo {
        ID
        hoTen
        namSinh
        gioiTinh
      }
    }
  }
}
`;
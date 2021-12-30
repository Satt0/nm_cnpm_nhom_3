import { gql } from "@apollo/client";
export const TACH_HO_KHAU = gql`
  mutation TachHoKhau($input: inputTaoHoKhau!) {
  tachHoKhau(input: $input) {
    ID
    maHoKhau
    chuHo {
      ID
      hoTen
      namSinh
      gioiTinh
    }
    maKhuVuc
    diaChi
    ngayChuyenDi
    dinhChinh {
      ID
      thongTinThayDoi
    }
    thanhVien {
      ID
      hoTen
      namSinh
      gioiTinh
    }
  }
}
`;

import { gql } from "@apollo/client";

export const DANH_SACH_HO_KHAU = gql`
query DanhSachHoKhau($input: inputLocHoKhau!) {
  danhSachHoKhau(input: $input) {
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
`

import { gql } from "@apollo/client";
export const DANH_SACH_NHAN_KHAU_KHONG_CO_HO_KHAU = gql`
query DanhSachNhanKhauKhongCoHoKhau {
  danhSachNhanKhauKhongCoHoKhau {
    ID
    hoTen
    namSinh
    gioiTinh
  }
}
`
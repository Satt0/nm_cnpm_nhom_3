
import { gql } from "@apollo/client";
export const DANH_SACH_KHOAN_DONG = gql`
query DanhSachKhoanDong($input: inputLocKhoanDong!) {
  danhSachKhoanDong(input: $input) {
    ID
    tenKhoanDong
    ngayTao
    soTien
    donVi
    theLoai
    hoanThanh
    khoanThu {
      daDong
    }
    chuaDong {
      ID
    }
  }
}
`
export const COUNT_ALL=gql`
query {
  countAll
}
`
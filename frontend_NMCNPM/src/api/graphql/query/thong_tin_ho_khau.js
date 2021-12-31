import { gql } from "@apollo/client";

export const THONG_TIN_HO_KHAU = gql`
query ThongTinHoKhau($input: Int!) {
  thongTinHoKhau(input: $input) {
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
      quanHeVoiChuHo
    }
  }
}
`


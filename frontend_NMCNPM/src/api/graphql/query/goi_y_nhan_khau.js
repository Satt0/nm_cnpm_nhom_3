import {gql} from '@apollo/client'

export const GOI_Y_NHAN_KHAU=gql`
query GoiYNhanKhau($input: inputTimNhanKhau) {
  goiYNhanKhau(input: $input) {
    ID
    hoTen
    namSinh
    maNhanKhau
    gioiTinh
    nguyenQuan
    noiThuongTru
    diaChiHienNay
    noiSinh
  }
}


`
import { gql } from "@apollo/client";
export const TAO_HO_KHAU = gql`
  mutation TaoHoKhau($input: inputTaoHoKhau!) {
  taoHoKhau(input: $input) {
    ID
    maHoKhau
    chuHo {
      ID
      hoTen
    }
    maKhuVuc
    diaChi
    ngayChuyenDi
    dinhChinh {
      ID
    }
    thanhVien {
      ID
      hoTen
      namSinh
    }
  }
}
`;
 
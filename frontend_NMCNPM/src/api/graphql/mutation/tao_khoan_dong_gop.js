
import { gql } from "@apollo/client";
export const TAO_KHOAN_DONG_GOP = gql`
  mutation TaoKhoanDongGop($input: inputTaoKhoanDongGop!) {
  taoKhoanDongGop(input: $input) {
    ID
    tenKhoanDong
    ngayTao
    soTien
    donVi
    theLoai
    hoanThanh
    khoanThu {
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
    chuaDong {
      ID
      maHoKhau
      chuHo {
        ID
        hoTen
        namSinh
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
}
`;
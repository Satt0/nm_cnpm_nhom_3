import { gql } from "@apollo/client";
export const THONG_TIN_KHOAN_DONG = gql`
query ThongTinKhoanDong($input: Int!) {
  thongTinKhoanDong(input: $input) {
    ID
    tenKhoanDong
    ngayTao
    soTien
    donVi
    theLoai
    hoanThanh
    chuaDong {
      ID
      chuHo {
        ID
        hoTen
        namSinh
      }
      diaChi
    }
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
        }
      }
    }
  }
}
`
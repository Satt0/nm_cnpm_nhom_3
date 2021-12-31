import { gql } from "@apollo/client";
export const CAP_NHAT_KHOAN_DONG_GOP = gql`
  mutation CapNhatKhoanDongGop($input: inputCapNhatKhoanDongGop!) {
  capNhatKhoanDongGop(input: $input) {
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
      }
    }
    chuaDong {
      ID
      maHoKhau
      chuHo {
        ID
        hoTen
      }
    }
  }
}
`;
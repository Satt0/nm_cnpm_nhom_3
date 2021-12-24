import { gql } from "graphql-tag";

export const KHAI_BAO_TAM_TRU = gql`
  mutation KhaiBaoTamTru($input: inputTamTru!) {
  khaiBaoTamTru(input: $input) {
    ID
    maGiayTamTru
    soDienThoaiNguoiDangKy
    tuNgay
    denNgay
    lyDo
  }
}
`;
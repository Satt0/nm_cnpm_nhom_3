import { gql } from "graphql-tag";

export const KHAI_TU = gql`
  mutation KhaiTu($input: inputKhaiTu!) {
  khaiTu(input: $input) {
    ID
    soGiayKhaiTu
    nguoiKhai {
      ID
      hoTen
      namSinh
    }
    ngayKhai
    ngayChet
    lyDoChet
  }
}
`;
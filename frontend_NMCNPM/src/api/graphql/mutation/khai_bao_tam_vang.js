import { gql } from "graphql-tag";

export const KHAI_BAO_TAM_VANG = gql`
  mutation KhaiBaoTamVang($input: inputTamVang!) {
  khaiBaoTamVang(input: $input) {
    ID
    maGiayTamVang
    tuNgay
    noiTamTru
    denNgay
    lyDo
  }
}
`;


import { gql } from "graphql-tag";

export const TAO_NHAN_KHAU = gql`
  mutation taoNhanKhau($input: inputTaoNhanKhau!) {
    taoNhanKhau(input: $input) {
      ID
      bietDanh
      bietTiengDanToc
      danToc
      hoTen
    }
  }
`;



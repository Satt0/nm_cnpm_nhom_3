import { gql } from "@apollo/client";
export const TAO_THE_DINH_DANH = gql`
  mutation TaoTheDinhDanh($input: inputDinhDanh!) {
  taoTheDinhDanh(input: $input) {
    ID
    soDinhDanh
    ngayCap
    noiCap
    type
  }
}
`;

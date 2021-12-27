import { gql } from "@apollo/client";
export const XOA_HO_DA_DONG = gql`
  mutation XoaHoDaDong($input: inputXoaDaDong!) {
  xoaHoDaDong(input: $input)
}
`;
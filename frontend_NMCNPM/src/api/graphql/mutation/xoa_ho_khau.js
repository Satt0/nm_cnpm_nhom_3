import React, {useState} from "react";
import { gql } from "graphql";
import { useMutation } from "@apollo/client";

const XOA_HO_KHAU = gql`
mutation XoaHoKhau($input: Int!) {
  xoaHoKhau(input: $input)
}
`;

function XoaHoKhau(){
    const [ID, setID] = useState("");
    const [deleteUser, { loading}] = useMutation(XOA_HO_KHAU)
if (loading) {
    return <h1> DATA IS LOADING...</h1>;
  }

  return(
    <div>
      <input
              type="text"
              placeholder="ID cần xóa"
              onChange={(event) => {
                setID(event.target.value);
              }}
            />

      <button
              onClick={() => {
                deleteUser({
                  variables: {
                    input: ID ,
                  },
                });
    
               
              }}
            >
              Xóa hộ khẩu
            </button>      
    </div>
  )
}
export default XoaHoKhau
import React, {useState} from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";

export const XOA_NHAN_KHAU = gql`
mutation xoaNhanKhau($input: Int!){
  xoaNhanKHau(input: $input)
}
`;

function XoaNhanKhau(){
    const [ID, setID] = useState("");
    const [deleteUser, { loading}] = useMutation(XOA_NHAN_KHAU)
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
              Xóa nhân khẩu
            </button>      
    </div>
  )
}
export default XoaNhanKhau
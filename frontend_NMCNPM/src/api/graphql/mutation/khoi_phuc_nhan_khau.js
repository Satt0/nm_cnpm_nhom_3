import React, {useState} from "react";
import { gql } from "graphql";
import { useMutation } from "@apollo/client";

const KHOI_PHUC_NHAN_KHAU = gql`
mutation khoiPhucNhanKhau($input: Int!){
  khoiPhucNhanKhau(input: $input)
}
`;

function KhoiPhucNhanKhau(){
    const [ID, setID] = useState("");
    const [restoreUser, { loading}] = useMutation(KHOI_PHUC_NHAN_KHAU)
if (loading) {
    return <h1> DATA IS LOADING...</h1>;
  }

  return(
    <div>
      <input
              type="text"
              placeholder="ID cần khôi phục"
              onChange={(event) => {
                setID(event.target.value);
              }}
            />

      <button
              onClick={() => {
                restoreUser({
                  variables: {
                    input: ID ,
                  },
                });
    
               
              }}
            >
              Khôi phục nhân khẩu
            </button>      
    </div>
  )
}
export default KhoiPhucNhanKhau
import React, {useState} from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";

export const XOA_TIEU_SU = gql`
mutation xoaTieuSu($input: Int!){
  xoaTieuSu(input: $input)
}
`;

function XoaTieuSu(){
    const [ID, setID] = useState("");
    const [deleteUser, { loading}] = useMutation(XOA_TIEU_SU)
if (loading) {
    return <h1> DATA IS LOADING...</h1>;
  }

  return(
    <div>
      <input
              type="text"
              placeholder="ID tiểu sử cần xóa"
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
              Xóa tiểu sử
            </button>      
    </div>
  )
}
export default XoaTieuSu
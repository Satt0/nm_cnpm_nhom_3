import React, {useState} from "react";
import { gql } from "graphql";
import { useMutation } from "@apollo/client";

const XOA_THANH_VIEN = gql`
mutation XoaThanhVienGiaDinh($input: inputXoaKhau!) {
  xoaThanhVienGiaDinh(input: $input)
}
`;

function XoaThanhVien(){
    const [idNhanKhau, setIdNhanKhau] = useState("");
    const [idHoKhau, setIdHoKhau] = useState("")
    const [deleteUser, { loading}] = useMutation(XOA_THANH_VIEN)
if (loading) {
    return <h1> DATA IS LOADING...</h1>;
  }

  return(
    <div>
      <input
              type="text"
              placeholder="ID hộ khẩu"
              onChange={(event) => {
                setIdHoKhau(event.target.value);
              }}
            />
      <input
              type="text"
              placeholder="ID nhân khẩu"
              onChange={(event) => {
                setIdNhanKhau(event.target.value);
              }}
            />      

      <button
              onClick={() => {
                deleteUser({
                  variables: {
                    input: {idHoKhau, idNhanKhau} ,
                  },
                });
    
               
              }}
            >
              Xóa thành viên
            </button>      
    </div>
  )
}
export default XoaThanhVien
import React from "react";
import { gql } from "graphql";
import { useMutation } from "@apollo/client";
import Form from "../../../components/Form";
const CAP_NHAT_THANH_VIEN = gql`
  mutation CapNhatThanhVien($input: inputSuaKhau!) {
  capNhatThanhVien(input: $input) {
    nhanKhau {
      ID
      hoTen
      namSinh
      gioiTinh
    }
    hoKhau {
      ID
      maHoKhau
      chuHo {
        ID
        hoTen
        namSinh
        gioiTinh
      }
      maKhuVuc
      diaChi
    }
    quanHeVoiChuHo
  }
}
`;

function CapNhatThanhVien(){
    const listInput=[

        {
            label:"ID nhân khẩu",
            name:"idNhanKhau",
            isRequired:true,
            defaultValue:"",
            type:"text",
            placeHolder:'ID nhân khẩu',
        },
        {
            label:"ID hộ khẩu",
            name:"idHoKhau",
            isRequired:true,
            defaultValue:"",
            type:"text",
            placeHolder:'ID hộ khẩu',
        },
        {
            label:"Quan hệ với chủ hộ",
            name:"quanHeVoiChuHo",
            isRequired:true,
            defaultValue:"",
            type:"text",
            placeHolder:'Quan hệ với chủ hộ',
        },
        ]
        let arrayName = listInput.map(item =>{
            return item.name
          }).join(',')
        const [updateFamily] = useMutation(CAP_NHAT_THANH_VIEN) 

        return(
            <div>
          <div>
            <Form listInput={listInput} />
          
            <button
              onClick={() => {
                updateFamily({
                  variables: {
                    input: arrayName
                  },
                });
    
               
              }}
            >
              Cập nhật thành viên
            </button>
          </div>
          </div>
        )
}
export default CapNhatThanhVien

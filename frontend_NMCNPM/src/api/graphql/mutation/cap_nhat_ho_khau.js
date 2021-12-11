import React from "react";
import { gql } from "graphql";
import { useMutation } from "@apollo/client";
import Form from "../../../components/Form";
const CAP_NHAT_HO_KHAU = gql`
  mutation CapNhatHoKhau($input: inputCapNhatHoKhau!) {
  capNhatHoKhau(input: $input) {
    ID
    maHoKhau
    chuHo {
      ID
      hoTen
      bietDanh
      namSinh
    }
    maKhuVuc
    diaChi
    ngayChuyenDi
    dinhChinh {
      ID
    }
    thanhVien {
      ID
      hoTen
      bietDanh
      namSinh
    }
  }
}
`;

function CapNhatHoKhau(){
  const listInput=[

    {
    label:"ID chủ hộ",
    name:"idChuHo",
    isRequired:true,
    defaultValue:"",
    type:"text",
    placeHolder:'ID chủ hộ',
    },
    {
    label:"Mã khu vực",
    name:"maKhuVuc",
    isRequired:true,
    type:"text",
    defaultValue:"không có",
    placeHolder:'điền mã khu vực',
    },
    {
      label:"Địa chỉ",
      name:"diaChi",
      isRequired:true,
      type:"text",
      defaultValue:"không có",
      placeHolder:'điền địa chỉ',
    },
    {
      label:"Ngày chuyển đi",
      name:"ngayChuyenDi",
      isRequired:true,
      type:"text",
      defaultValue:"không có",
      placeHolder:'điền ngày chuyển đi',
    },  
    {
      label:"Mã hộ khẩu",
      name:"maHoKhau",
      isRequired:true,
      type:"text",
      defaultValue:"không có",
      placeHolder:'điền mã hộ khẩu',
    },
    {
      label:"ID",
      name:"ID",
      isRequired:true,
      type:"text",
      defaultValue:"không có",
      placeHolder:'điền ID',
    }
    ];

    let arrayName = listInput.map(item =>{
      return item.name
    }).join(',')
 

const [updateUser, { loading}] = useMutation(CAP_NHAT_HO_KHAU)
if (loading) {
    return <h1> DATA IS LOADING...</h1>;
  }
  
    return (
        <div>
          <div>
            <Form listInput={listInput} />
          
            <button
              onClick={() => {
                updateUser({
                  variables: {
                    input: arrayName
                  },
                });
    
               
              }}
            >
              Cập nhật hộ khẩu
            </button>
          </div>
          </div>
  )
            }
 
            export default CapNhatHoKhau
            

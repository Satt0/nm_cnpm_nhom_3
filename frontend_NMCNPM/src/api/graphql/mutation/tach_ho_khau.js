import React from "react";
import { gql } from "graphql";
import { useMutation } from "@apollo/client";
import Form from "../../../components/Form";
const TACH_HO_KHAU = gql`
  mutation TachHoKhau($input: inputTaoHoKhau!) {
  tachHoKhau(input: $input) {
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
    ngayChuyenDi
    dinhChinh {
      ID
      thongTinThayDoi
    }
    thanhVien {
      ID
      hoTen
      namSinh
      gioiTinh
    }
  }
}
`;

function TachHoKhau(){
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
      label:"ID nhân khẩu",
      name:"idNhanKhau",
      isRequired:true,
      type:"text",
      defaultValue:"không có",
      placeHolder:'điền ID',
    },
    {
      label:"ID hộ khẩu",
      name:"idHoKhau",
      isRequired:true,
      type:"text",
      defaultValue:"không có",
      placeHolder:'điền ID',
    },  
    {
      label:"Quan hệ với chủ hộ",
      name:"quanHeVoiChuHo",
      isRequired:true,
      type:"text",
      defaultValue:"không có",
      placeHolder:'điền quan hệ với chủ hộ',
    }
    ];

    let arrayName = listInput.map(item =>{
      return item.name
    }).join(',')
 

const [createUser, { loading}] = useMutation(TACH_HO_KHAU)
if (loading) {
    return <h1> DATA IS LOADING...</h1>;
  }
  
    return (
        <div>
          <div>
            <Form listInput={listInput} />
          
            <button
              onClick={() => {
                createUser({
                  variables: {
                    input: arrayName
                  },
                });
    
               
              }}
            >
              Tách hộ khẩu
            </button>
          </div>
          </div>
  )
            }
 
            export default TachHoKhau
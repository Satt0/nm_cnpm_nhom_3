import React from "react";
import { gql } from "graphql";
import { useMutation } from "@apollo/client";
import Form from "../../../components/Form";
const NHAP_KHAU = gql`
  mutation NhapKhau($input: inputNhapKhau!) {
  nhapKhau(input: $input) {
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
      }
      diaChi
      maKhuVuc
      ngayChuyenDi
      dinhChinh {
        ID
        thongTinThayDoi
      }
      thanhVien {
        ID
        hoTen
        bietDanh
        namSinh
        gioiTinh
      }
    }
    quanHeVoiChuHo
  }
}
`;

function NhapKhau(){
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
        const [nhapKhau] = useMutation(NHAP_KHAU) 

        return(
            <div>
          <div>
            <Form listInput={listInput} />
          
            <button
              onClick={() => {
                nhapKhau({
                  variables: {
                    input: arrayName
                  },
                });
    
               
              }}
            >
              Nhập khẩu
            </button>
          </div>
          </div>
        )
}
export default NhapKhau

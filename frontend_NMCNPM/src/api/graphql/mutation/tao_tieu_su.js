import React from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
export const TAO_TIEU_SU = gql`
mutation taoTieuSu($input: inputTieuSu!){
  taoTieuSu(input: $input) {
    ID
    tuNgay
    denNgay
    diaChi
    ngheNghiep
    noiLamViec
  }
}
`;

function TaoTieuSu(){
    const listInput=[

        {
        label:"ID",
        name:"ID",
        isRequired:true,
        defaultValue:"",
        type:"text",
        placeHolder:'nhập ID',
        },
        {
        label:"Từ ngày",
        name:"tuNgay",
        isRequired:true,
        type:"text",
        defaultValue:"không có",
        placeHolder:'nhập ngày',
        },
        {
            label:"Đến ngày",
            name:"denNgay",
            isRequired:true,
            type:"text",
            defaultValue:"không có",
            placeHolder:'nhập ngày',
        },
        {
            label:"Địa chỉ",
            name:"diaChi",
            isRequired:true,
            type:"text",
            defaultValue:"không có",
            placeHolder:'nhập địa chỉ',
        },
        {
            label:"Nghề nghiệp",
            name:"ngheNghiep",
            isRequired:true,
            type:"text",
            defaultValue:"không có",
            placeHolder:'nhập nghề nghiệp',
        },
        {
            label:"Nơi làm việc",
            name:"noiLamViec",
            isRequired:true,
            type:"text",
            defaultValue:"không có",
            placeHolder:'nhập địa điểm',
            },    
        ];
        let arrayName = listInput.map(item =>{
            return item.name
          }).join(',')
        
    

    const [createTS, { loading}] = useMutation(TAO_TIEU_SU)
if (loading) {
    return <h1> DATA IS LOADING...</h1>;
  }

  return(
      <div>
          <div>
          
            <button
              onClick={() => {
                createTS({
                  variables: {
                    input: arrayName
                  },
                });
    
               
              }}
            >
              Tạo tiểu sử
            </button>
          </div>
      </div>
  )
}
export default TaoTieuSu
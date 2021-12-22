import React from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import Form from "../../../components/Form";
export const CAP_NHAT_NHAN_KHAU = gql`
  mutation capNhatNhanKhau($input: inputCapNhatNhanKhau!){
capNhatNhanKhau(input: $input) {
  bietDanh
    bietTiengDanToc
    danToc
    hoTen
    noiSinh
    ID
}
}
`;

function CapNhatNhanKhau(){
  const listInput=[
    {
      label:"ID",
      name:"ID",
      isRequired:true,
      defaultValue:"",
      type:"text",
      placeHolder:'điền ID',
    },
    {
      label:"Họ Tên",
      name:"hoTen",
      isRequired:true,
      defaultValue:"",
      type:"text",
      placeHolder:'enter your name',
    },
    {
      label:"Nghề nghiệp",
      name:"ngheNghiep",
      isRequired:true,
      type:"text",
      defaultValue:"không có",
      placeHolder:'điền nghề nhiệp',
    },
    {
      label:"Biệt danh",
      name:"bietDanh",
      isRequired:true,
      type:"text",
      defaultValue:"không có",
      placeHolder:'điền biệt danh',
    },
    {
      label:"Mã nhân khẩu",
      name:"maNhanKhau",
      isRequired:true,
      type:"text",
      defaultValue:"không có",
      placeHolder:'điền mã nhân khẩu',
    },  
    {
      label:"Nơi sinh",
      name:"noiSinh",
      isRequired:true,
      type:"text",
      defaultValue:"không có",
      placeHolder:'điền nơi sinh',
    },
    {
      label:"Nơi thường trú",
      name:"noiThuongTru",
      isRequired:true,
      type:"text",
      defaultValue:"không có",
      placeHolder:'điền nơi thường trú',
    },
    {
      label:"Biết tiếng dân tộc",
      name:"bietTiengDanToc",
      isRequired:true,
      type:"text",
      defaultValue:"không có",
      placeHolder:'điền tiếng dân tộc',
    },  
    {
      label:"Dân tộc",
      name:"danToc",
      isRequired:true,
      type:"text",
      defaultValue:"không có",
      placeHolder:'điền dân tộc',
    },  
    {
      label:"Địa chỉ hiện nay",
      name:"DiaChiHienNay",
      isRequired:true,
      type:"text",
      defaultValue:"không có",
      placeHolder:'điền địa chỉ hiện nay',
    }, 
    {
      label:"Địa chỉ mới",
      name:"diaChiMoi",
      isRequired:true,
      type:"text",
      defaultValue:"không có",
      placeHolder:'điền địa chỉ mới',
    }, 
    {
      label:"Giới tính",
      name:"gioiTinh",
      isRequired:true,
      type:"text",
      defaultValue:"không có",
      placeHolder:'điền giới tính',
    },  
    {
      label:"ID người tạo",
      name:"idNguoiTao",
      isRequired:true,
      type:"text",
      defaultValue:"không có",
      placeHolder:'điền id người tạo',
    },  
    {
      label:"Lý do chuyển đến",
      name:"lyDoChuyenDen",
      isRequired:true,
      type:"text",
      defaultValue:"không có",
      placeHolder:'điền lý do chuyển đến',
    },
    {
      label:"Lý do chuyển đi",
      name:"lyDoChuyenDi",
      isRequired:true,
      type:"text",
      defaultValue:"không có",
      placeHolder:'điền lý do chuyển đi',
    },    
    {
      label:"Ngày tạo",
      name:"ngayTao",
      isRequired:true,
      type:"text",
      defaultValue:"không có",
      placeHolder:'điền ngày tạo',
    },  
    {
      label:"Nguyên quán",
      name:"nguyenQuan",
      isRequired:true,
      type:"text",
      defaultValue:"không có",
      placeHolder:'điền nguyên quán',
    },  
    {
      label:"Nơi làm việc",
      name:"noiLamViec",
      isRequired:true,
      type:"text",
      defaultValue:"không có",
      placeHolder:'điền nơi làm việc',
    },   
    {
      label:"Quốc tịch",
      name:"quocTich",
      isRequired:true,
      type:"text",
      defaultValue:"không có",
      placeHolder:'điền quốc tịch',
    },  
    {
      label:"Số hộ chiếu",
      name:"soHoChieu",
      isRequired:true,
      type:"text",
      defaultValue:"không có",
      placeHolder:'điền số hộ chiếu',
    }, 
    {
      label:"Tiền án",
      name:"tienAn",
      isRequired:true,
      type:"text",
      defaultValue:"không có",
      placeHolder:'điền tiền án',
    },   
    {
      label:"Tôn giáo",
      name:"tonGiao",
      isRequired:true,
      type:"text",
      defaultValue:"không có",
      placeHolder:'điền tôn giáo',
    },  
    {
      label:"Trình độ chuyên môn",
      name:"trinhDoChuyenMon",
      isRequired:true,
      type:"text",
      defaultValue:"không có",
      placeHolder:'điền trình độ',
    },    
    {
      label:"Trình độ học vấn",
      name:"trinhDoHocVan",
      isRequired:true,
      type:"text",
      defaultValue:"không có",
      placeHolder:'điền trình độ',
    }, 
    {
      label:"Trình độ ngoại ngữ",
      name:"trinhDoNgoaiNgu",
      isRequired:true,
      type:"text",
      defaultValue:"không có",
      placeHolder:'điền trình độ',
    },     
    {
      label:"Ngày xóa",
      name:"ngayXoa",
      isRequired:true,
      defaultValue:"",
      type:"text",
      placeHolder:'điền ngày xóa',
    },
    {
      label:"ID người xóa",
      name:"idNguoiXoa",
      isRequired:true,
      defaultValue:"",
      type:"text",
      placeHolder:'điền ID',
    },
    {
      label:"Lý do xóa",
      name:"lyDoXoa",
      isRequired:true,
      defaultValue:"",
      type:"text",
      placeHolder:'điền lý do xóa',
    },
    {
      label:"Ghi chú",
      name:"ghiChu",
      isRequired:true,
      defaultValue:"",
      type:"text",
      placeHolder:'điền ghi chú',
    },
    ];

    let arrayName = listInput.map(item =>{
      return item.name
    }).join(',')
 

const [updateUser, { loading}] = useMutation(CAP_NHAT_NHAN_KHAU)
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
              Cập nhật nhân khẩu
            </button>
          </div>
          </div>
  )
            }
 
            export default CapNhatNhanKhau
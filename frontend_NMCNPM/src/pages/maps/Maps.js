import React,{useState,useEffect} from "react";
import {TAO_NHAN_KHAU} from "../../api/graphql/mutation/nhan_khau";
import Form from "../../components/Form";
import { useMutation } from "@apollo/client";
import moment from 'moment'
import './Maps.css'
import { Button } from "@material-ui/core";
export const listInput=[
  {
  label:"Họ Tên",
  name:"hoTen",
  isRequired:true,
  defaultValue:"",
  type:"text",
  placeHolder:'enter your name',
  
  },
  {
    label:"Biệt danh",
    name:"bietDanh",
    isRequired:true,
    type:"text",
    defaultValue:"",
    placeholder:'điền biệt danh',
  },
  {
    label:"Năm sinh",
    name:"namSinh",
    isRequired:true,
    type:"date",
    defaultValue:'1999-01-01',
    placeholder:'điền năm sinh',
  },
  {
    label:"Giới tính",
    name:"gioiTinh",
    isRequired:true,
    type:"text",
    defaultValue:"",
    placeholder:'điền giới tính',
  },  
  {
    label:"Nguyên quán",
    name:"nguyenQuan",
    isRequired:true,
    type:"text",
    defaultValue:"",
    placeholder:'điền nguyên quán',
  }, 
  {
    label:"Dân tộc",
    name:"danToc",
    isRequired:true,
    type:"text",
    defaultValue:"",
    placeholder:'điền dân tộc',
    options:[
      "Kinh",
      "Thai"
    ]
  },   
  {
    label:"Tôn giáo",
    name:"tonGiao",
    isRequired:true,
    type:"text",
    defaultValue:"",
    placeholder:'điền tôn giáo',
  },  
  {
    label:"Quốc tịch",
    name:"quocTich",
    isRequired:true,
    type:"text",
    defaultValue:"",
    placeholder:'điền quốc tịch',
  },  
  {
    label:"Số hộ chiếu",
    name:"soHoChieu",
    isRequired:true,
    type:"text",
    defaultValue:"",
    placeholder:'điền số hộ chiếu',
  }, 
  {
    label:"Nơi thường trú",
    name:"noiThuongTru",
    isRequired:true,
    type:"text",
    defaultValue:"",
    placeholder:'điền nơi thường trú',
  },
  {
    label:"Địa chỉ hiện nay",
    name:"diaChiHienNay",
    isRequired:true,
    type:"text",
    defaultValue:"",
    placeholder:'điền địa chỉ hiện nay',
  }, 
  {
  label:"Nghề nghiệp",
  name:"ngheNghiep",
  isRequired:true,
  type:"text",
  defaultValue:"",
  placeholder:'điền nghề nhiệp',
  },
  
  {
    label:"Mã nhân khẩu",
    name:"maNhanKhau",
    isRequired:true,
    type:"text",
    defaultValue:"",
    placeholder:'điền mã nhân khẩu',
  },  
  {
    label:"Nơi sinh",
    name:"noiSinh",
    isRequired:true,
    type:"text",
    defaultValue:"",
    placeholder:'điền nơi sinh',
  },
  {
    label:"Biết tiếng dân tộc",
    name:"bietTiengDanToc",
    isRequired:true,
    type:"text",
    defaultValue:"",
    placeholder:'điền tiếng dân tộc',
  },  
  {
    label:"Địa chỉ mới",
    name:"diaChiMoi",
    isRequired:true,
    type:"text",
    defaultValue:"",
    placeholder:'điền địa chỉ mới',
  }, 
  {
    label:"Lý do chuyển đến",
    name:"lyDoChuyenDen",
    isRequired:true,
    type:"text",
    defaultValue:"",
    placeholder:'điền lý do chuyển đến',
  },
  {
    label:"Lý do chuyển đi",
    name:"lyDoChuyenDi",
    isRequired:true,
    type:"text",
    defaultValue:"",
    placeholder:'điền lý do chuyển đi',
  }, 
  {
    label:"Ngày chuyển đến",
    name:"ngayChuyenDen",
    isRequired:true,
    type:"date",
    defaultValue:moment().format("YYYY-MM-DD"),
    placeholder:'điền ngày chuyển đến',
  },   
  {
    label:"Ngày chuyển đi",
    name:"ngayChuyenDi",
    isRequired:true,
    type:"date",
    defaultValue:'1111-11-11',
    placeholder:'điền ngày chuyển đi',
  },
  {
    label:"Ngày tạo",
    name:"ngayTao",
    isRequired:true,
    type:"date",
    defaultValue:moment().format("YYYY-MM-DD"),
    hidden:true,
    placeholder:'điền ngày tạo',
  },  
  {
    label:"Nơi làm việc",
    name:"noiLamViec",
    isRequired:true,
    type:"text",
    defaultValue:"",
    placeholder:'điền nơi làm việc',
  },   
  {
    label:"Tiền án",
    name:"tienAn",
    isRequired:true,
    type:"text",
    defaultValue:"",
    placeholder:'điền tiền án',
  },   
  
  {
    label:"Trình độ chuyên môn",
    name:"trinhDoChuyenMon",
    isRequired:true,
    type:"text",
    defaultValue:"",
    placeholder:'điền trình độ',
  },    
  {
    label:"Trình độ học vấn",
    name:"trinhDoHocVan",
    isRequired:true,
    type:"text",
    defaultValue:"",
    placeholder:'điền trình độ',
  }, 
  {
    label:"Trình độ ngoại ngữ",
    name:"trinhDoNgoaiNgu",
    isRequired:true,
    type:"text",
    defaultValue:"",
    placeholder:'điền trình độ',
  },
  ];
function TaoNhanKhau(){
  

  const [state,setState]=useState(()=>{
    const nhanKhau={};
    listInput.forEach(p=>{
      nhanKhau[p.name]=p.defaultValue ?? "";
    })
     return nhanKhau;
  })
const handleChange=(key)=>{
  return (e)=>{
    const value=e.target.value;
    setState(old=>({...old,[key]:value}))
  }
}
const [createUser,{loading,data}] = useMutation(TAO_NHAN_KHAU)

 useEffect(()=>{
   if(loading) return;
  if(data)
 {
  const {ID}=data.taoNhanKhau
  console.log(ID);
 }
 
 },[loading,data])
 
    return (
        <div>
          <div className="res">
            <div className="input">
            <Form listInput={listInput} state={state}  handleChange={handleChange}/>
          </div>
            <Button variant="contained" color="success" onClick={() => {
                createUser({
                  variables: {
                    input: 
                      state 
                    
                  },
                }).catch(e=>{
                  console.log(e.message)
                });
                console.log(state);
               
              }}>Tạo nhân khẩu</Button>
          </div>
          </div>
  )
            }
 
            export default TaoNhanKhau
import React,{useState,useEffect} from 'react'
import {TAO_KHOAN_DONG_GOP} from "../../../api/graphql/mutation/tao_khoan_dong_gop"
import Form from "../../../components/Form";
import { useMutation } from "@apollo/client";
import { Button } from "@material-ui/core";
import {Link} from 'react-router-dom'
import NewForm from '../../../components/autoCompleteForm';
export const listInput=[
    {
    label:"Tên khoản đóng",
    name:"tenKhoanDong",
    isRequired:true,
    defaultValue:"",
    type:"text",
    placeHolder:'enter your name',
    
    },
    {
      label:"Số tiền",
      name:"soTien",
      isRequired:true,
      type:"number",
      defaultValue:"",
      placeholder:'điền biệt danh',
    },
    {
      label:"Đơn vị",
      name:"donVi",
      isRequired:true,
      defaultValue:'',
      placeholder:'điền năm sinh',
      type: "date",
      options: ["theo hộ", "theo người"],
      id: "a"
    },
    {
      label:"Thể loại",
      name:"theLoai",
      isRequired:true,
      type:"text",
      defaultValue:"",
      placeholder:'điền giới tính',
      type:"date",
      options: ["hàng tháng", "hàng năm"],
      id: "b"
    }
    ];
const TaoKhoanDongGop = () => {
    const [state,setState]=useState(()=>{
        const nhanKhau={};
        listInput.forEach(p=>{
          nhanKhau[p.name]=p.defaultValue ?? "";
        })
         return nhanKhau;
      })
      console.log(state);
    const handleChange=(key)=>{
      return (e)=>{
        const value=e.target.value;
        setState(old=>({...old,[key]:value}))
      }
    }
    const [createDG,{loading,data}] = useMutation(TAO_KHOAN_DONG_GOP)
    
     useEffect(()=>{
       if(loading) return;
      if(data)
     {
      // const {tenKhoanDong}=data.TaoKhoanDongGop
      // console.log(tenKhoanDong);
     }
     
     },[loading,data])
    return (
        <div>
            <NewForm listInput={listInput} state={state}  handleChange={handleChange}/>
            <Link to={`/app/table-kdg`}>
            <Button variant="contained" color="success" onClick={() => {
                createDG({
                  variables: {
                    input: 
                    {...state,soTien:parseInt(state.soTien)} 
                    
                  },
                }).catch(e=>{
                  console.log(e.message)
                });
                console.log(state);
               
              }}>Tạo khoản đóng góp</Button>
              </Link>
        </div>
    )
}

export default TaoKhoanDongGop

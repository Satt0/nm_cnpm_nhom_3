import React, {useState, useEffect} from 'react'
import {useParams } from 'react-router-dom';
import { THONG_TIN_NHAN_KHAU } from '../../../api/graphql/query/thong_tin_nhan_khau';
import {CAP_NHAT_NHAN_KHAU} from '../../../api/graphql/mutation/cap_nhat_nhan_khau';
import { useLazyQuery, useQuery, useMutation } from "@apollo/client";
import { Button } from "@material-ui/core";
import moment from 'moment'
import Form from "../../../components/Form";
export default function EditOne() {
    const params = useParams();
    const id = Object.values(params)[0]
    const 
        { data: InforSearchedData, error: InforError, loading }
       = useQuery(THONG_TIN_NHAN_KHAU, {
        variables: {
          input: parseInt(id),
        },
      });
      const [updateUser, { loading1, data}] = useMutation(CAP_NHAT_NHAN_KHAU)  
      const listInput=[
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
          type:"text",
          defaultValue:"",
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
          type:"text",
          defaultValue:"",
          placeholder:'điền ngày chuyển đến',
        },   
        {
          label:"Ngày chuyển đi",
          name:"ngayChuyenDi",
          isRequired:true,
          type:"text",
          defaultValue:"",
          placeholder:'điền ngày chuyển đi',
        },
        {
            label:"Ngày tạo",
            name:"ngayTao",
            isRequired:true,
            type:"text",
            defaultValue:moment().format('YYYY-MM-DD'),
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
        {
            label:"ID",
            name:"ID",
            isRequired:true,
            defaultValue:"",
            type:"text",
            placeHolder:'điền ID',
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
          useEffect(()=>{
            if(loading) return 
           if(InforSearchedData)
          {
        //    setState({...InforSearchedData.thongTinNhanKhau})
           setState({hoTen: InforSearchedData.thongTinNhanKhau.hoTen,
             ID: InforSearchedData.thongTinNhanKhau.ID,
             bietDanh: InforSearchedData.thongTinNhanKhau.bietDanh,
             namSinh: InforSearchedData.thongTinNhanKhau.namSinh,
             gioiTinh: InforSearchedData.thongTinNhanKhau.gioiTinh,
             nguyenQuan: InforSearchedData.thongTinNhanKhau.nguyenQuan,
             danToc: InforSearchedData.thongTinNhanKhau.danToc,
             tonGiao: InforSearchedData.thongTinNhanKhau.tonGiao,
             quocTich: InforSearchedData.thongTinNhanKhau.quocTich,
             soHoChieu: InforSearchedData.thongTinNhanKhau.soHoChieu,
             noiThuongTru: InforSearchedData.thongTinNhanKhau.noiThuongTru,
             diaChiHienNay: InforSearchedData.thongTinNhanKhau.diaChiHienNay,
             ngheNghiep: InforSearchedData.thongTinNhanKhau.ngheNghiep,
             maNhanKhau: InforSearchedData.thongTinNhanKhau.maNhanKhau,
             noiSinh: InforSearchedData.thongTinNhanKhau.noiSinh,
             bietTiengDanToc: InforSearchedData.thongTinNhanKhau.bietTiengDanToc,
             diaChiMoi: InforSearchedData.thongTinNhanKhau.diaChiMoi,
             lyDoChuyenDen: InforSearchedData.thongTinNhanKhau.lyDoChuyenDen,
             lyDoChuyenDi: InforSearchedData.thongTinNhanKhau.lyDoChuyenDi,
             ngayChuyenDen: InforSearchedData.thongTinNhanKhau.ngayChuyenDen,
             ngayChuyenDi: InforSearchedData.thongTinNhanKhau.ngayChuyenDi,
             noiLamViec: InforSearchedData.thongTinNhanKhau.noiLamViec,
             tienAn: InforSearchedData.thongTinNhanKhau.tienAn,
             trinhDoChuyenMon: InforSearchedData.thongTinNhanKhau.trinhDoChuyenMon,
             trinhDoHocVan: InforSearchedData.thongTinNhanKhau.trinhDoHocVan,
             trinhDoNgoaiNgu: InforSearchedData.thongTinNhanKhau.trinhDoNgoaiNgu
            })
          }
          
          },[loading,InforSearchedData])
          useEffect(()=>{
            if(loading1) return;
           if(data)
          {
           const {ID}=data.capNhatNhanKhau
           console.log(ID);
          }
          
          },[loading1,data])
        
    return (
        <div>
        <Form listInput={listInput} state={state}  handleChange={handleChange}/>
        <Button variant="contained" color="success" onClick={() => {
                updateUser({
                  variables: {
                    input: 
                      state 
                    
                  },
                }).catch(e=>{
                  console.log(e.message)
                });
                console.log(state);
               console.log(InforSearchedData.thongTinNhanKhau)
              }}>Cập nhật nhân khẩu</Button>
        </div>
    )
}
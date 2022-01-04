import React from 'react'
import { DANH_SACH_HO_KHAU } from '../../../api/graphql/query/danh_sach_ho_khau'
import { useQuery,useMutation } from '@apollo/client'
import {Redirect,Link} from 'react-router-dom'
import { XOA_HO_KHAU } from '../../../api/graphql/mutation/xoa_ho_khau'
import {TextField,Button,Table,TableRow,TableHead,TableBody,TableCell} from "@material-ui/core"
export default function DanhSachHoKhau() {
    const {data,loading,error,refetch}=useQuery(DANH_SACH_HO_KHAU,{fetchPolicy:"no-cache",variables:{input:{offset:0,limit:500}}})
  const [xoaHoKhau]=useMutation(XOA_HO_KHAU)
    if(loading) return <h1>Please Wait</h1>
    if(error)  return <Redirect  to={"/app/dashboard"}/>;

    if(data){


        return (
            <div>
             
               <Table className="mb-0">
          <TableHead>
            <TableRow>
            <TableCell> ID</TableCell>
            <TableCell> Mã Hộ Khẩu</TableCell>
            <TableCell> Địa Chỉ</TableCell>
            <TableCell>Chủ Hộ</TableCell>
            <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.danhSachHoKhau.map(({ ID,maHoKhau,diaChi,chuHo}) => (
              <TableRow key={ID}>
                <TableCell className="pl-3 fw-normal">
               {ID}
               </TableCell>
               <TableCell className="pl-3 fw-normal">
               
                {maHoKhau}
                    
               
               </TableCell>
               <TableCell>
                   {diaChi}
               </TableCell>
               <TableCell>
                   {chuHo?.hoTen || "không có"}
               </TableCell>
              
              
               <TableCell>
               <Link to={`/app/edit-hk/${ID}`}><Button style={{marginRight:5}}  variant='contained' color="primary">Edit</Button></Link>
                   <Button onClick={async()=>{
                     try{
                      await xoaHoKhau({variables:{input:parseInt(ID)}})
                      await refetch({variables:{
                        input:{
                          offset:0,
                          limit:500
                        }
                      }})

                     }catch(e){
                    return   alert('không thể xóa hộ khẩu.')
                     }
                   }} variant='contained' color="secondary">Xóa</Button>
               </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    
            </div>
        )
    }
}

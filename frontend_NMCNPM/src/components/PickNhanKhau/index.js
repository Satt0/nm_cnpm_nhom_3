import { TextField,Button,Table,TableRow,TableCell,TableBody,TableHead } from '@material-ui/core'
import React ,{useEffect,useState} from 'react'
import styles from './style.module.css'
import {useLazyQuery} from '@apollo/client'
import { GOI_Y_NHAN_KHAU } from '../../api/graphql/query/goi_y_nhan_khau'
import moment from 'moment'
export default function PickNhanKhau({setNhanKhau}) {
    const [callApi,{data,error,loading}]=useLazyQuery(GOI_Y_NHAN_KHAU)
    const [name,setName]=React.useState("")
    const onSubmit=async(e)=>{
        e.preventDefault();
        try{
            callApi({
                variables:{
                input:{
                    offset:0,
                    limit:500,
                    name:name
                }
                }
            })
        }catch(e){
            console.log(e.message);
        }
    }
    const onAdd=(nk)=>{
        setNhanKhau((old)=>{
            return [...old.filter(e=>e.ID!==nk.ID),nk]
        })
    }
    useEffect(()=>{
        if(loading) return;
        console.log(data);
    },[data,error,loading])
    return (
       <div className={styles.container}>
           <form className={styles.form} onSubmit={onSubmit}>
           <TextField
           value={name}
           onChange={(e)=>setName(e.target.value)}
           type="text" label="tìm theo tên" variant="outlined"/>
           <Button variant='outlined' color="primary" type="submit">Tìm kiếm</Button>
           </form>
            <div>
            <Table className="mb-0">
      <TableHead>
        <TableRow>
        <TableCell> ID</TableCell>
        <TableCell> tên</TableCell>
        <TableCell>ngày sinh</TableCell>
        <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.goiYNhanKhau?.map(({ ID,hoTen,namSinh}) => (
          <TableRow key={ID}>
            <TableCell>{ID}</TableCell>
            <TableCell>{hoTen}</TableCell>
            <TableCell>{moment(namSinh*1).format("YYYY-MM-DD")}</TableCell>
            <Button onClick={()=>{onAdd({ID,hoTen,namSinh})}} variant='outlined' color="primary">Thêm</Button>
          </TableRow>
        ))}
      </TableBody>
    </Table>
            </div>
       </div>
    )
}

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { THONG_TIN_NHAN_KHAU } from "../../../api/graphql/query/thong_tin_nhan_khau";
import { CAP_NHAT_NHAN_KHAU } from "../../../api/graphql/mutation/cap_nhat_nhan_khau";
import { TAO_TIEU_SU } from "../../../api/graphql/mutation/tao_tieu_su";
import { useLazyQuery, useQuery, useMutation } from "@apollo/client";
import moment from 'moment'
import { Button } from "@material-ui/core";
import { listInput } from "../../maps/Maps";
import Form from "../../../components/Form";
import './sua-nhan-khau.css'
import {Table,TableHead,TableRow,TableCell,TableBody,} from '@material-ui/core'
import {Link} from 'react-router-dom'

export default function EditOne() {
  
  const params = useParams();
  const id = Object.values(params)[0];
  const { data: InforSearchedData, error: InforError, loading } = useQuery(
    THONG_TIN_NHAN_KHAU,
    {
      variables: {
        input: parseInt(id),
      },
      fetchPolicy: "no-cache"
    },
  );
  const [updateUser, { loading: loadingUpdate, data }] = useMutation(
    CAP_NHAT_NHAN_KHAU,
  );
  const [createTS, { loading: loadingTS, data: dataTS}] = useMutation(TAO_TIEU_SU)

  const listInputTS=[

    {
    label:"ID nhân khẩu",
    name:"idNhanKhau",
    isRequired:true,
    defaultValue:parseInt(id),
    type:"text",
    placeHolder:'nhập ID',
    },
    {
    label:"Từ ngày",
    name:"tuNgay",
    isRequired:true,
    type:"text",
    defaultValue:"",
    placeHolder:'nhập ngày',
    },
    {
        label:"Đến ngày",
        name:"denNgay",
        isRequired:true,
        type:"text",
        defaultValue:"",
        placeHolder:'nhập ngày',
    },
    {
        label:"Địa chỉ",
        name:"diaChi",
        isRequired:true,
        type:"text",
        defaultValue:"",
        placeHolder:'nhập địa chỉ',
    },
    {
        label:"Nghề nghiệp",
        name:"ngheNghiep",
        isRequired:true,
        type:"text",
        defaultValue:"",
        placeHolder:'nhập nghề nghiệp',
    },
    {
        label:"Nơi làm việc",
        name:"noiLamViec",
        isRequired:true,
        type:"text",
        defaultValue:"",
        placeHolder:'nhập địa điểm',
        },    
    ];

    const [stateTS,setStateTS]=useState(()=>{
      const nhanKhau={};
      listInputTS.forEach(p=>{
        nhanKhau[p.name]=p.defaultValue ?? "";
      })
       return nhanKhau;
    })

  const [state, setState] = useState(0);
  const [arrayData, setArrayData] = useState([])
  const handleChange = (key) => {
    return (e) => {
      const value = e.target.value;
      setState((old) => ({ ...old, [key]: value }));
    };
  };
  const handleChangeTS = (key) => {
    return (e) => {
      const value = e.target.value;
      setStateTS((old) => ({ ...old, [key]: value }));
    };
  };
  useEffect(()=>{
    if(loadingTS) return;
   if(dataTS)
  {
   const {ID}=dataTS.taoTieuSu
   console.log(ID);
  }
  
  },[loadingTS,dataTS])
  useEffect(() => {
    if (loading) return;
    if (InforSearchedData) {
      const {
        ID,
        hoTen,
        bietDanh,
        namSinh,
        gioiTinh,
        noiSinh,
        nguyenQuan,
        danToc,
        tonGiao,
        quocTich,
        soHoChieu,
        noiThuongTru,
        diaChiHienNay,
        trinhDoHocVan,
        trinhDoChuyenMon,
        bietTiengDanToc,
        trinhDoNgoaiNgu,
        ngheNghiep,
        noiLamViec,
        tienAn,
        ngayChuyenDen,
        lyDoChuyenDen,
        ngayChuyenDi,
        lyDoChuyenDi,
        diaChiMoi,
        maNhanKhau,
        tieuSu,
      } = InforSearchedData.thongTinNhanKhau;
      
      setArrayData(tieuSu)
      setState({
        ID,
        hoTen,
        bietDanh,
       namSinh:moment(parseInt(namSinh)).format("YYYY-MM-DD"),
        gioiTinh,
        noiSinh,
        nguyenQuan,
        danToc,
        tonGiao,
        quocTich,
        soHoChieu,
        noiThuongTru,
        diaChiHienNay,
        trinhDoHocVan,
        trinhDoChuyenMon,
        bietTiengDanToc,
        trinhDoNgoaiNgu,
        ngheNghiep,
        noiLamViec,
        tienAn,
        ngayChuyenDen:moment(parseInt(ngayChuyenDen)).format("YYYY-MM-DD"),
        lyDoChuyenDen,
        ngayChuyenDi:moment(parseInt(ngayChuyenDi)).format("YYYY-MM-DD"),
        lyDoChuyenDi,
        diaChiMoi,
        maNhanKhau,
      });
    }
  }, [loading, InforSearchedData]);
  
  useEffect(() => {
    if (loadingUpdate) return;
    if (data) {
      const { ID } = data.capNhatNhanKhau;
      console.log(ID);
    }
  }, [loadingUpdate, data]);

  useEffect(()=>{
    if(dataTS){
      setArrayData(arrayData => [...arrayData, dataTS.taoTieuSu])
     
    }
  },[dataTS])
  if (loading && state !== 0) return <h1>please wait</h1>;

  
  return (
    <div>
      <Form listInput={listInput} state={state} handleChange={handleChange} />
      <Button className="btn-update"
        variant="contained"
        color="success"
        onClick={() => {
          updateUser({
            variables: {
              input: state,
            },
          }).catch((e) => {
            console.log(e.message);
          });
        console.log(state)
        
        }}
      >
        Cập nhật nhân khẩu
      </Button>
      <Form listInput={listInputTS} state={stateTS}  handleChange={handleChangeTS}/>
      <Button className="btn-TS"
        variant="contained"
        color="success"
        onClick={() => {
          createTS({
            variables: {
              input: stateTS,
            },
          }).catch((e) => {
            console.log(e.message);
          });
        // console.log(stateTS)
        // const mergeState = {...state, ...stateTS}
        // console.log(dataTS)
        // setState(mergeState)
        // setArrayData(arrayData => [...arrayData, dataTS.taoTieuSu])
        // console.log(arrayData)
        }}
      >
        Tạo tiểu sử
      </Button>
     
      <Table className="mb-0">
      <TableHead>
        <TableRow>
        <TableCell> Từ ngày</TableCell>
        <TableCell> Đến ngày</TableCell>
        <TableCell> Địa chỉ</TableCell>
        <TableCell> Nghề nghiệp</TableCell>
        <TableCell> Nơi làm việc</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {arrayData?.map(({ tuNgay, denNgay, diaChi, ngheNghiep, noiLamViec}) => (
          <TableRow key={tuNgay}>
            <TableCell className="pl-3 fw-normal">
            {tuNgay}
            </TableCell>
            <TableCell>
            {denNgay}
            </TableCell>
            <TableCell>
            {diaChi}
            </TableCell>
            <TableCell>
            {ngheNghiep}
            </TableCell>
            <TableCell>
            {noiLamViec}
            </TableCell>
            
            
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CAP_NHAT_KHOAN_DONG_GOP } from '../../../api/graphql/mutation/cap_nhat_khoan_dong_gop'
import { THONG_TIN_KHOAN_DONG } from '../../../api/graphql/query/thong_tin_khoan_dong'
import { DONG_TIEN } from "../../../api/graphql/mutation/dong_tien";
import { XOA_HO_DA_DONG } from "../../../api/graphql/mutation/xoa_ho_da_dong";
import { CAP_NHAT_KHOAN_THU } from "../../../api/graphql/mutation/cap_nhat_khoan_thu";
import { listInput } from '../tao'
import { Button } from "@material-ui/core";
import Form from "../../../components/Form";
import NewForm from "../../../components/autoCompleteForm";
import { useLazyQuery, useQuery, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { TextField } from "@material-ui/core";
import {Table,TableHead,TableRow,TableCell,TableBody,} from '@material-ui/core'
import moment from "moment"
import "./capnhat.css"
const CapNhatKhoanDong = () => {
    const params = useParams();
  const id = Object.values(params)[0];
  const history = useHistory();
  // const listInputDT=[
  //   {
  //   label:"ID đóng góp",
  //   name:"idDongGop",
  //   isRequired:true,
  //   defaultValue:parseInt(id),
  //   type:"text",
  //   placeHolder:'enter your name',
    
  //   },
  //   {
  //     label:"ID hộ khẩu",
  //     name:"idHoKhau",
  //     isRequired:true,
  //     type:"text",
  //     defaultValue:"",
  //     placeholder:'điền biệt danh',
  //   },
  //   {
  //     label:"Đã đóng",
  //     name:"daDong",
  //     isRequired:true,
  //     defaultValue:parseInt(0),
  //     placeholder:'điền năm sinh',
  //   },
  //   ];
    const [idDongGop, setIdDongGop] = useState(parseInt(id))
    const [idHoKhau, setIdHoKhau] = useState("")
    const [daDong, setDaDong] = useState(parseInt(0))
  const { data: InforSearchedData, error: InforError, loading, refetch } = useQuery(
    THONG_TIN_KHOAN_DONG,
    {
      variables: {
        input: parseInt(id),
      },
      fetchPolicy: "no-cache",
    },
  );
  const [updateKT, { loading: loadingUpdateKT, data: dataKT }] = useMutation(
    CAP_NHAT_KHOAN_THU
  );
  const [submit, { loading: loadingSubmit, data: dataSubmit}] = useMutation(
    DONG_TIEN
  );
  const [deleteHo, { loading: loadingDelete, data: dataDelete }] = useMutation(
    XOA_HO_DA_DONG
  );
  const [updateUser, { loading: loadingUpdate, data }] = useMutation(
    CAP_NHAT_KHOAN_DONG_GOP,
  );
  
  const [state, setState] = useState(0);
  const handleChange = (key) => {
    return (e) => {
      const value = e.target.value;
      setState((old) => ({ ...old, [key]: value }));
    };
  };
  
  useEffect(()=>{
    if(loadingSubmit) return;
   if(dataSubmit)
  {
   refetch()
  }
  
  },[loadingSubmit,dataSubmit])

  useEffect(()=>{
    if(loadingDelete) return;
   if(dataDelete)
  {
   refetch()
  }
  
  },[loadingDelete,dataDelete])
  useEffect(()=>{
    if(loadingUpdateKT) return;
   if(dataKT)
  {
   refetch()
  }
  
  },[loadingUpdateKT,dataKT])
  useEffect(() => {
    if (loading) return;
    if (InforSearchedData) {
      const {
        ID,
    tenKhoanDong,
    soTien,
    donVi,
    theLoai,
    hoanThanh,
    khoanThu
      } = InforSearchedData.thongTinKhoanDong;

      
      setState({
        ID,
    tenKhoanDong,
    soTien,
    donVi,
    theLoai,
    hoanThanh: false,
      });
      setArray(InforSearchedData.thongTinKhoanDong.khoanThu.map((dadong1)=>{
        return dadong1.daDong
      }))

      setArrayCD(InforSearchedData.thongTinKhoanDong.chuaDong.map((chuadong)=>{
        return chuadong.ID
      }))
    }
  }, [loading, InforSearchedData]);

  useEffect(() => {
    if (loadingUpdate) return;
    if (data) {
      const { ID } = data.capNhatNhanKhau;
      console.log(ID);
    }
  }, [loadingUpdate, data]);
  useEffect(() => {
    if (loadingUpdateKT) return;
  }, [loadingUpdateKT, dataKT]);
  const [arrayCD, setArrayCD] = useState([])
  const [array, setArray] = useState([])
  console.log(array)
  console.log(arrayCD)
  function sumArray(array){
    let sum = 0;
    for (let i = 0; i < array.length; i++){
        sum += array[i];
    }
     
    return sum;
}
    return (
        <div>
            <NewForm listInput={listInput} state={state} handleChange={handleChange} />
            <Button
        className="btn-update1"
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
          console.log(state);
          history.push("/app/table-kdg");
        }}
      >
        Cập nhật khoản đóng góp
      </Button>
      <div className="flex">
      <div className="flex1">
        <div>
      <input
          className="input1"
          type="text"
          list="id-theloai"
          placeholder="Nhập ID"
          onChange={(event) => {
            setIdHoKhau(parseInt(event.target.value));
          }}
        />
        <datalist id="id-theloai">
          {arrayCD.map((item)=>
          <option value={parseInt(item)}>a</option>
          )}
          
        </datalist>
        <TextField
        className="input"
          required
          id="outlined-required"
          label="Required"
          defaultValue=""
          placeholder="Đã đóng"
          onChange={(event) => {
            setDaDong(parseInt(event.target.value));
          }}
        />
        </div>
      <Button
        className="btn-update"
        variant="contained"
        color="success"
        onClick={() => {
          submit({
            variables: {
              input: {idDongGop, idHoKhau, daDong} ,
            },
          }).catch((e) => {
            console.log(e.message);
          });
          // console.log(stateDT);
          refetch()
          // setArray(InforSearchedData.thongTinKhoanDong.khoanThu.map((dadong1)=>{
          //   return dadong1.daDong
          // }))
          console.log(array)
          
        }}
      >
        Đóng góp
      </Button>
      </div>
      <div className="flex2">
        <div>
        <TextField
        className="input"
          required
          id="outlined-required"
          label="Required"
          defaultValue=""
          placeholder="Nhập ID"
          onChange={(event) => {
            setIdHoKhau(parseInt(event.target.value));
          }}
        />
        <TextField
        className="input"
          required
          id="outlined-required"
          label="Required"
          defaultValue=""
          placeholder="Đã đóng"
          onChange={(event) => {
            setDaDong(parseInt(event.target.value));
          }}
        />
        </div>
        <Button
        className="btn-update"
        variant="contained"
        color="success"
        onClick={() => {
          updateKT({
            variables: {
              input: {idDongGop, idHoKhau, daDong} ,
            },
          }).catch((e) => {
            console.log(e.message);
          });
          // console.log(stateDT);
          refetch()
          // setArray(InforSearchedData.thongTinKhoanDong.khoanThu.map((dadong1)=>{
          //   return dadong1.daDong
          // }))
          console.log(array)
          
        }}
      >
        Cập nhật khoản thu
      </Button>
      </div>
      <div className="flex3">
        <div>
        <TextField
        className="input"
          required
          id="outlined-required"
          label="Required"
          defaultValue=""
          placeholder="Nhập ID"
          onChange={(event) => {
            setIdHoKhau(parseInt(event.target.value));
          }}
        />
        </div>
        <Button
        className="btn-update"
        variant="contained"
        color="success"
        onClick={() => {
          deleteHo({
            variables: {
              input: {idDongGop, idHoKhau} ,
            },
          }).catch((e) => {
            console.log(e.message);
          });
          // console.log(stateDT);
          console.log(InforSearchedData)
          refetch()
          // setArray(InforSearchedData.thongTinKhoanDong.khoanThu.map((dadong1)=>{
          //   return dadong1.daDong
          // }))
          console.log(array)
          
        }}
      >
        Xóa hộ đã đóng
      </Button>
      </div>
      </div>
      <Table className="mb-0">
      <TableHead>
        <TableRow>
        <TableCell> ID hộ khẩu chưa đóng</TableCell>
        <TableCell>Tên chủ hộ</TableCell>
        <TableCell> ID chủ hộ</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {InforSearchedData?.thongTinKhoanDong?.chuaDong?.map(({ ID, chuHo}) => (
          <TableRow key={ID}>
            <TableCell className="pl-3 fw-normal">
            {ID}
            </TableCell>
            <TableCell>
            {chuHo.hoTen}
            </TableCell>
            <TableCell>
            {chuHo.ID}
            </TableCell>
            <TableCell>
              
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
        <Table className="mb-0">
      <TableHead>
        <TableRow>
        <TableCell> ID hộ khẩu đã đóng</TableCell>
        <TableCell>Tên chủ hộ</TableCell>
        <TableCell> Đã đóng</TableCell>
        <TableCell> Ngày đóng</TableCell>
        <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {InforSearchedData?.thongTinKhoanDong?.khoanThu?.map(({ daDong,ngayDong,hoKhau}) => (
          <TableRow key={hoKhau.ID}>
            <TableCell className="pl-3 fw-normal">
            {hoKhau.ID}
            </TableCell>
            <TableCell>
            {hoKhau.chuHo.hoTen}
            </TableCell>
            <TableCell>
            {daDong}
            </TableCell>
            <TableCell>{moment(parseInt(ngayDong)).format("DD-MM-YYYY")}</TableCell>
            <TableCell>
              
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <h1>Tổng đã đóng: {sumArray(array)}</h1>
        </div>
    )
}

export default CapNhatKhoanDong

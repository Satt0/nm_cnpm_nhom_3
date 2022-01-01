import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useLazyQuery, useMutation} from '@apollo/client'
import {Table,TableHead,TableRow,TableCell,TableBody,} from '@material-ui/core'
import { DANH_SACH_KHOAN_DONG } from '../../../api/graphql/query/danh_sach_khoan_dong'
import { XOA_KHOAN_DONG_GOP } from '../../../api/graphql/mutation/xoa_khoan_dong_gop'
import { Button } from "@material-ui/core";
const DanhSachKhoanDong = () => {
    const [
        fetchInfor,
        { data: InforSearchedData, error: InforError, loading: loadingDG, refetch },
      ] = useLazyQuery(DANH_SACH_KHOAN_DONG,{fetchPolicy: "no-cache"});
      const [deleteDG,{loading,data}] = useMutation(XOA_KHOAN_DONG_GOP)  
      const[limit] = useState(500);  
      const[offset] = useState(0);
      const[hoanThanh] = useState(false)
      const[tenKhoanDong, setTenKhoanDong] = useState("")
      const[theLoai, setTheLoai] = useState("")  
      const [state, setState] = useState([])
      useEffect(() => {
        if (loadingDG) return;
        if (InforSearchedData) {
          setState(InforSearchedData)
          refetch()
        }
        
      }, [loading, InforSearchedData]);
    return (
        <div>
            <input
          type="text"
          placeholder="Nhập tên khoản đóng"
          onChange={(event) => {
            setTenKhoanDong(event.target.value);
          }}
        />
        <input
          type="text"
          list="id-theloai"
          placeholder="Nhập thể loại"
          onChange={(event) => {
            setTheLoai(event.target.value);
          }}
        />
        <datalist id="id-theloai">
          <option value="hàng tháng"> hàng tháng</option>
          <option value="hàng năm"> hàng năm</option>
        </datalist>
        <button
          onClick={() => {
            fetchInfor({
              variables: {
                input: {limit, offset, hoanThanh, tenKhoanDong, theLoai}
              },
            });
            // console.log(InforSearchedData.danhSachKhoanDong)
          }}
        >
          Danh sách khoản đóng
        </button>
        <Table className="mb-0">
      <TableHead>
        <TableRow>
        <TableCell> ID</TableCell>
        <TableCell> Tên khoản đóng</TableCell>
        <TableCell> Số tiền</TableCell>
        <TableCell> Đơn vị</TableCell>
        <TableCell> </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {state?.danhSachKhoanDong?.map(({ ID,tenKhoanDong,soTien, donVi}) => (
          <TableRow key={ID}>
            <TableCell className="pl-3 fw-normal"><Link to={`/app/edit-kdg/${ID}`}>
            {ID}
            </Link></TableCell>
            <TableCell><Link to={`/app/edit-kdg/${ID}`}>
            {tenKhoanDong}
            </Link></TableCell>
            <TableCell>{soTien}</TableCell>
            <TableCell>{donVi}</TableCell>
            <TableCell>
            <Button
        className="btn-TS"
        variant="contained"
        color="success"
        onClick={() => {
          deleteDG({
            variables: {
              input: parseInt(ID),
            },
          }).catch((e) => {
            console.log(e.message);
          });
          // setState(old=>{
          //   return old.filter(e=>e.ID!==ID)
          //   })
          setState(InforSearchedData.danhSachKhoanDong.filter(e=> e.ID !== ID))  
          refetch()
        }}
      >
        Xóa
      </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
          {InforError && <h1> There was an error fetching the data</h1>}
        </div>
    )
}

export default DanhSachKhoanDong

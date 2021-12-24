import React,{useState,useEffect} from "react";
import { TextField,Table,TableRow,TableBody,TableHead,TableCell,Button } from "@material-ui/core";
import styles from './styles.module.css'
import moment from 'moment'
import { Link } from "react-router-dom";
import PickNhanKhau from "../../../components/PickNhanKhau";
const inputs = [
  {
    name: "maHoKhau",
    label: "Mã hộ khẩu",
    isRequired: true,
    type: "text",
  },
  {
    name: "maKhuVuc",
    label: "Mã khu vực",
    isRequired: true,
    type: "text",
  },
  {
    name: "diaChi",
    label: "Địa chỉ",
    isRequired: true,
    type: "text",
  },
];
export default function TaoHoKhau() {
  const [state, setState] = useState({
    idChuHo: -1,
    maKhuVuc: "",
    diaChi: "",
    ngayChuyenDi: "1111-11-11",
    maHoKhau: "",
    
  });
  const [showPicker,setShow]=React.useState(false)
  const [nhanKhau,setNhanKhau]=useState([])
  const handleChange=(key)=>{

    return (e)=>{
        setState(old=>({...old,[key]:e.target.value}))
    }
  }
  return (
    <div>
      <form className={styles.form} >

      {inputs.map((i) => (
        <TextField
          {...i}
          InputLabelProps={{ shrink: true }}
          variant="outlined"
        />
      ))}
      </form>
      <h2 className={styles.center}>Đã thêm</h2>
      <Table className="mb-0">
      <TableHead>
        <TableRow>
        <TableCell> ID</TableCell>
        <TableCell> HoTen</TableCell>
        <TableCell> ngay sinh</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {nhanKhau?.map(({ ID,hoTen,namSinh}) => (
          <TableRow key={ID}>
            <TableCell className="pl-3 fw-normal"><Link to={`/app/edit-nk/${ID}`}>
            {ID}
            </Link></TableCell>
            <TableCell><Link to={`/app/edit-nk/${ID}`}>
            {hoTen}
            </Link></TableCell>
            <TableCell>{moment(parseInt(namSinh)).format("DD-MM-YYYY")}</TableCell>
            
          </TableRow>
        ))}
      </TableBody>
    </Table>
        <h2 className={styles.center}>Nhân khẩu</h2>
        <PickNhanKhau setNhanKhau={setNhanKhau}/>
      
    </div>
  );
}


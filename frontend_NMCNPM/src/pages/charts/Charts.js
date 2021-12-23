import React, {useState} from 'react'
import {useLazyQuery,useMutation} from '@apollo/client'
import {TIM_NHAN_KHAU} from '../../api/graphql/query/tim_nhan_khau'
import MUIDataTable from "mui-datatables";
import { Grid } from "@material-ui/core";
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import { makeStyles } from "@material-ui/styles";
import Table from "../dashboard/components/Table/Table";
import { Button } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))
export default function CapNhatNhanKhau() {
  const classes = useStyles();
    // const nhanKhau=useQuery(TIM_NHAN_KHAU,{variables:{
    //     input:match.id
    // }})

    // if(nhanKhau.loading) return <h1>loading</h1>
    const [
        fetchInfor,
        { data: InforSearchedData, error: InforError },
      ] = useLazyQuery(TIM_NHAN_KHAU);
    const[limit, setLimit] = useState("500");  
    const[offset, setOffset] = useState("0");
    const[name, setName] = useState("")

    return(
        <div>
            
            <input
          type="text"
          placeholder="Giới hạn"
          onChange={(event) => {
            setLimit(event.target.value);
          }}
          value={limit}
        />
        <input
          type="text"
          placeholder="Nhập Offset"
          onChange={(event) => {
            setOffset(event.target.value);
          }}
          value={offset}
        />
        <input
          type="text"
          placeholder="Nhập tên"
          onChange={(event) => {
            setName(event.target.value);
          }}
          // value={name}
        />
        <button
          onClick={() => {
            fetchInfor({
              variables: {
                input: {limit: parseInt(limit), offset: parseInt(offset), name: name}
              },
            });
            console.log(InforSearchedData)
          }
          
        }
        >
          Tìm nhân khẩu
        </button>

       
          {/* {InforSearchedData && InforSearchedData.timNhanKhau.map((person)=>{
            return( */}
               <div>
              <PageTitle title="Tables" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget title="Material-UI Table" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
            <Table data={InforSearchedData} />
          </Widget>
        </Grid>
      </Grid>
              {/* <Table striped bordered hover>
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Họ tên</th>
      <th scope="col">Biệt danh</th>
      <th scope="col">Năm sinh</th>
      <th scope="col">Giới tính</th>
      <th scope="col">Dân tộc</th>
      <th scope="col">Nguyên quán</th>
      <th scope="col">Mã nhân khẩu</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{person.ID}</td>
      <td>{person.hoTen}</td>
      <td>{person.bietDanh}</td>
      <td>{person.namSinh}</td>
      <td>{person.gioiTinh}</td>
      <td>{person.danToc}</td>
      <td>{person.nguyenQuan}</td>
      <td>{person.maNhanKhau}</td>
    </tr>
  </tbody>
  </Table> */}
  
  {/* <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Employee List"
            data={InforSearchedData}
            columns={["ID", "Họ tên", "Biệt danh", "Năm sinh", "Giới tính", "Dân tộc", "Nguyên quán", "Mã nhân khẩu"]}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
        </Grid> */}
            </div>
          {/* // )}
          //   )
          // } */}
    </div>
    )
}


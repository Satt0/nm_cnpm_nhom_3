import React, {useState} from 'react'
import {useLazyQuery,useMutation} from '@apollo/client'
import {Table,TableHead,TableRow,TableCell,TableBody,} from '@material-ui/core'
import {TIM_NHAN_KHAU} from '../../api/graphql/query/tim_nhan_khau'
import moment from 'moment'
import {Link} from 'react-router-dom'
export default function CapNhatNhanKhau() {

    // const nhanKhau=useQuery(TIM_NHAN_KHAU,{variables:{
    //     input:match.id
    // }})

    // if(nhanKhau.loading) return <h1>loading</h1>
    const [
        fetchInfor,
        { data: InforSearchedData, error: InforError },
      ] = useLazyQuery(TIM_NHAN_KHAU,{fetchPolicy: "no-cache"});
    const[limit] = useState(500);  
    const[offset] = useState(0);
    const[name, setName] = useState("")

    return(
        <div>
        <input
          type="text"
          placeholder="Nhập tên"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <button
          onClick={() => {
            fetchInfor({
              variables: {
                input: {limit, offset, name}
              },
            });
            console.log(InforSearchedData)
          }}
        >
          Tìm nhân khẩu
        </button>

        <div>
        
<Table className="mb-0">
      <TableHead>
        <TableRow>
        <TableCell> ID</TableCell>
        <TableCell> HoTen</TableCell>
        <TableCell> ngay sinh</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {InforSearchedData?.timNhanKhau?.map(({ ID,hoTen,namSinh}) => (
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
          {InforError && <h1> There was an error fetching the data</h1>}
        </div>
        </div>
    )
    
}

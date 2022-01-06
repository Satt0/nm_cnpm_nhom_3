import React,{useEffect,useState} from 'react'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { TIM_NHAN_KHAU } from '../../api/graphql/query/tim_nhan_khau'
import { DANH_SACH_HO_KHAU } from '../../api/graphql/query/danh_sach_ho_khau'
import { COUNT_ALL } from '../../api/graphql/query/danh_sach_khoan_dong'
import moment from 'moment'
const groups=[
    {
        id:'nk',
        groupLabel:"Nhân khẩu",
        links:[
            {
                label:"Tạo nhân khẩu",
                href:"/app/create-nk",
            },
            {
                label:"Danh sách nhân khẩu",
                href:"/app/edit-nk",
            }
        ]
    },
    {   
        id:"hk",
        groupLabel:"Hộ khẩu",
        links:[
            {
                label:"Tạo hộ khẩu",
                href:"/app/create-hk",
            },
            {
                label:"Danh sách hộ khẩu",
                href:"/app/edit-hk",
            }
        ]
    },
    {
        id:'kd',
        groupLabel:"Đóng góp",
        links:[
            {
                label:"Tạo đóng góp",
                href:"/app/create-kdg",
            },
            {
                label:"Danh sách đóng góp",
                href:"/app/table-kdg",
            }
        ]
    }
]
export default function HomePage() {
    const {data:dataNK}=useQuery(TIM_NHAN_KHAU,{variables:{input:{offset:0,limit:500,name:""}},fetchPolicy:"no-cache"})
    const {data:dataHK}=useQuery(DANH_SACH_HO_KHAU,{variables:{input:{offset:0,limit:500}},fetchPolicy:"no-cache"})
    const {data:countDG}=useQuery(COUNT_ALL,{fetchPolicy:"no-cache"})
    const [state,setState]=useState(null);
    console.log(state);
    useEffect(() => {
            if(dataNK && dataHK && countDG){
                const {timNhanKhau}=dataNK;
                const {danhSachHoKhau}=dataHK;
                const {countAll}=countDG
                setState({
                    nk:timNhanKhau.length,
                    kd:countAll,
                    hk:danhSachHoKhau.length,
                    tt:timNhanKhau.filter(e=>filterTamTru(e.tamTru).length>0).length,
                    tv:timNhanKhau.filter(e=>fitlerTamVang(e.tamVang).length>0).length
                })
            }
        
    }, [dataHK,dataNK,countDG])
    if(state==null) return <p>loading</p>
    return (
       <>
        <div className={styles.container}>
            {groups.map(e=><GroupItem count={e?.id?state[e?.id]:-1} {...e}/>)}
        </div>
       <div>
           <h1>Số người tạm trú: {state.tt}</h1>
           <h1>Số người tạm vắng: {state.tv} </h1>
       </div>
       </>
    )
}
const GroupItem=({groupLabel,links,count})=>{


    return <div className={styles.item}>
        <h2>{groupLabel} {count>0?`(${count})`:""}</h2>
       <div className={styles.links}>
       {links.map(({label,href})=><Link to={href}>{label}</Link>)}
       </div>
    </div>
}

const filterTamTru = (ds) => {
    return ds.filter((e) => {
      return moment().isBefore(parseInt(e.denNgay));
    });
  };
  const fitlerTamVang = (ds) => {
    return ds.filter((e) => {
      return moment().isBefore(parseInt(e.denNgay));
    });
  };
  
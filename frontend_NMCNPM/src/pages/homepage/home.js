import React from 'react'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'
const groups=[
    {
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
        groupLabel:"Hộ khẩu",
        links:[
            {
                label:"Tạo hộ khẩu",
                href:"/app/create-hk",
            },
            {
                label:"Danh sách hộ khẩu",
                href:"/app/create-hk",
            }
        ]
    },
    {
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
    return (
        <div className={styles.container}>
            {groups.map(e=><GroupItem {...e}/>)}
        </div>
    )
}
const GroupItem=({groupLabel,links})=>{


    return <div className={styles.item}>
        <h2>{groupLabel}</h2>
       <div className={styles.links}>
       {links.map(({label,href})=><Link to={href}>{label}</Link>)}
       </div>
    </div>
}

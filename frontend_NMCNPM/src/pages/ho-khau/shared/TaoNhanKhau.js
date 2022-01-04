import React from 'react'
import TaoNhanKhau from '../../maps/Maps' 
import styles from './style.module.css'
import {Button} from '@material-ui/core'
export default function TaoNhanKhauShort({onComplete,onClose}) {

    return (
        <div className={styles.container}>
            <div onClick={onClose} style={{marginBottom:25}}>
                <Button variant="contained" color="primary">Back</Button>
            </div>
            <TaoNhanKhau onComplete={onComplete}/>
        </div>
    )
}

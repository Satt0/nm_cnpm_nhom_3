import { useState } from "react"
import React from 'react'

const Form = (listInput) => {
    const [state,setState]=useState(()=>{
    	const nhanKhau={};
      listInput.forEach(p=>{
        nhanKhau[p.name]=p.defaultValue ?? "";
      })
   		return nhanKhau;
    
  })
  
  const handleChange=(key)=>{
    
    return (e)=>{
      const value=e.target.value;
      setState(s=>({...s,[key]:value}))
    }
    
  }
  
  return <form>
    
    {listInput.map(item=><input 
     						onChange={handleChange(item.name)} placeHolder={item.placeHolder}  
							type={item.type} isRequired={item.isRequired} value={state[item.name]}  
                          />)}
    
    </form>
}

export default Form

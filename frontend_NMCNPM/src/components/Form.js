import "./Form.css";
import { TextField } from "@material-ui/core";

import React,{useEffect,useState} from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";
const Form = ({ listInput, handleChange, state }) => {
 
  return (
    <form className="form">
      {listInput.filter(target=>state[target.name]!==null && !target.hidden).map((item) => (
        <div>
          {item.type==="date"?<DateInput label={item.label} name={item.name}  defaultValue={state[item.name]}
          
          onChange={handleChange}
          />:
          <TextInput {...item} value={state[item.name]} handleChange={handleChange(item.name)} />

        
          
          }
        </div>
      ))}
    </form>
  );
};


const DateInput=({defaultValue,onChange,name,label})=>{
  

   const handleChange=(e)=>{
    
   
     onChange(name)(e)
   

  }
   return   <div>
     <label>{label}</label>
     <input type="date" value={defaultValue} onChange={handleChange}/>
   </div>
 
}
const TextInput=({options,name,isRequired,label,value,handleChange,type})=>{

// if(typeof options === 'object' && options.length>0){

//   return <Autocomplete
//   freeSolo
//   options={options.map((e) => ({ title: e })) }
//   getOptionLabel={(option) => option?.title?.toString()}
//   type={type}
  
//   isRequired={isRequired}
//   value={value}
//   onChange={handleChange}
//   renderInput={(params) => (
//     <TextField
//     {...params}
//       label={label}
//       variant="outlined"
//       InputLabelProps={{
//         shrink:true
//       }}
//     />
//     )}
//     />
//   }


return <TextField
    notched={true}
      onChange={handleChange}
      InputLabelProps={{
        shrink:true
      }}
      variant="outlined"
      type={type}
      label={label}
      isRequired={isRequired}
      value={value}
    />
}
export default Form;

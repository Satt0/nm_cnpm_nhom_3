import "./Form.css";
import { TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import React,{useEffect,useState} from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
const Form = ({ listInput, handleChange, state }) => {
  const classes = useStyles();
  return (
    <div className="form">
      {listInput.filter(target=>state[target.name]!==null && !target.hidden).map((item) => (
        <div>
          {item.type==="date"?<DateInput label={item.label} name={item.name}  defaultValue={state[item.name]}
          
          onChange={handleChange}
          />:
          <TextInput {...item} value={state[item.name]} handleChange={handleChange(item.name)} />
          
        
          
          }
        </div>
      ))}
    </div>
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
      // id="outlined-required"
      // required
      // id="outlined-disabled"
      required
      
    />
}
export default Form;

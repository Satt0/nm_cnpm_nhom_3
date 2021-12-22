import './Form.css'
import {TextField} from "@material-ui/core"
import React from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';

const Form = ({ listInput, handleChange, state }) => {
  return (
    <form className="form">
      {listInput.map((item) => (
        <div>
         <Autocomplete
  freeSolo
  options={item?.options?.map(e=>({title:e})) ?? []}
  getOptionLabel={(option) => option.title}
  type={item.type}
  isRequired={item.isRequired}
  
  
  renderInput={(params) => <TextField {...params}
  value={state[item.name]}
  onChange={handleChange(item.name)}
  label={item.label} variant="outlined" />}
/>
         
          {/* <TextField list={`dropdown-${item.name}`}
           onChange={handleChange(item.name)}
          
           placeholder={item.placeHolder}
           type={item.type}
           isRequired={item.isRequired}
           value={state[item.name]}
          label={item.label} variant="outlined" >
          {item?.options?.map((option) => {
            console.log(option);
            return (
              <MenuItem key={option} value={option}>
                {option.label}
              </MenuItem>
            )
          })}
            
            </TextField> */}
         
        </div>
      ))}
    </form>
  );
};

export default Form;
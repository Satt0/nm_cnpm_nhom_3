import './Form.css'
import {TextField,MenuItem} from "@material-ui/core"
import React from "react";

const Form = ({ listInput, handleChange, state }) => {
  return (
    <form className="form">
      {listInput.map((item) => (
        <div>
         
          {/* <input
            list={`dropdown-${item.name}`}
            onChange={handleChange(item.name)}
            placeHolder={item.placeHolder}
            type={item.type}
            isRequired={item.isRequired}
            value={state[item.name]}
          /> */}
          <TextField list={`dropdown-${item.name}`}
           onChange={handleChange(item.name)}
           placeholder={item.placeHolder}
           type={item.type}
           isRequired={item.isRequired}
           value={state[item.name]}
          label={item.label} variant="outlined" >
          {/* {item?.options?.map((option) => (
            <MenuItem key={option} value={option}>
              {option.label}
            </MenuItem>
          ))} */}
            
            </TextField>
          {/* {item.options && (
            <datalist id={`dropdown-${item.name}`}>
              {item.options.map((e) => (
                <option value={e} />
              ))}
            </datalist>
          )} */}
        </div>
      ))}
    </form>
  );
};

export default Form;

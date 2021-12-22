import "./Form.css";
import { TextField } from "@material-ui/core";
import React,{useEffect} from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";

const Form = ({ listInput, handleChange, state }) => {
 
  useEffect(()=>{
    console.log(state);
  },[state])
  return (
    <form className="form">
      {listInput.map((item) => (
        <div>
          <Autocomplete
            // freeSolo
            options={item?.options?.map((e) => ({ title: e })) ?? []}
           
            type={item.type}
            isRequired={item.isRequired}
            value={state[item.name]}
            renderInput={(params) => (
              <TextField
              {...params}
                onChange={handleChange(item.name)}
                label={item.label}
                variant="outlined"
              />
            )}
          />
        </div>
      ))}
    </form>
  );
};

export default Form;

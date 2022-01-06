import "./Form.css";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import React, { useEffect, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./style.module.css";
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
    <div className={styles.form} style={{ gridGap: "30px 15px" }}>
      {listInput
        .filter((target) => state[target.name] !== null && !target.hidden)
        .map((item) => (
          <div>
            {item.type === "date" ? (
              <DateInput
                label={item.label}
                name={item.name}
                defaultValue={state[item.name]}
                onChange={handleChange}
              />
            ) : (
              <TextInput
                {...item}
                value={state[item.name]}
                handleChange={handleChange(item.name)}
              />
            )}
          </div>
        ))}
    </div>
  );
};

const DateInput = ({ defaultValue, onChange, name, label }) => {
  const handleChange = (e) => {
    onChange(name)(e);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", maxWidth: 170 }}>
      <label>{label}</label>
      <input type="date" value={defaultValue} onChange={handleChange} />
    </div>
  );
};
const TextInput = ({
  options,
  name,
  isRequired,
  label,
  value,
  handleChange,
  type,
}) => {
  const [message, setMessage] = useState({
    error: false,
    message: "",
  });
  if (typeof options === "object" && options.length > 0) {
    
    return (
      <div style={{ maxWidth: 200 }}>
        <FormControl fullWidth>
          <InputLabel shrink={true} id={label + "test"} >
            {label}
          </InputLabel>
          <Select
            variant="outlined"
             value={value+''}

           onChange={handleChange}
          >
            {options.map((nk) => (
              <MenuItem value={nk}>{nk}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }

  return (
    <TextField
      notched={true}
      onChange={handleChange}
      InputLabelProps={{
        shrink: true,
      }}
      variant="outlined"
      type={type}
      label={label}
      required={isRequired}
      value={value}
      defaultValue="Không có"
      error={message.error}
      helperText={message.message}
      onFocus={() => {
        setMessage({ error: false, message: "" });
      }}
      onInvalid={(e) => {
        e.preventDefault();
        const isValid = e.target?.validity?.valid;
        if (!isValid) {
          setMessage({
            error: true,
            message: "Vui lòng điền đủ trường thông tin",
          });
        }
      }}
    />
  );
};
export default Form;

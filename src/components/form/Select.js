import React, { useState, useEffect } from "react";


export const Select = ({ errors, innerRef, children, label, name, ...rest }) => {
  const [error, setError] = useState("");

  useEffect(() => {
    let name_seq = name.split(".");
    let obj = errors;
    for (let seq of name_seq) {
      if (obj) {
        obj = obj[seq];
      }
    }
    if (obj) {
      setError(obj.message);
    } else {
      setError("");
    }
  }, [name, errors, error]);

  return (
    // <select {...register(name)} {...rest}>
    //   {options.map(value => (
    //     <option key={value} value={value}>
    //       {value}
    //     </option>
    //   ))}
    // </select>


    <div className="form-group">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <div className="form-control-wrap">
        <div className="form-control-select">
          {/* <select className="form-control form-select" {...register(name)} {...rest}> */}
          <select className="form-control form-select" name={name} ref={innerRef} {...rest}>
            {children}
          </select>
          {error && <span className="invalid">{error}</span>}
        </div>
      </div>
    </div>
  );
};


export default Select;
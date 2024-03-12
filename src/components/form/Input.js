import React, { useState, useEffect } from "react";

const Input = ({ name, label, errors, innerRef, ...rest }) => {
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
    // <input {...register(name)} {...rest} />

    <div className="form-group">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <div className="form-control-wrap">
        <input className="form-control" name={name} ref={innerRef} {...rest} />
        {error && <span className="invalid">{error}</span>}
      </div>
    </div>
  );
};

export default Input;

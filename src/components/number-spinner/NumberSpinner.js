import React, { useState, useRef } from "react";
import { Icon, Button } from "../Component";

const NSComponent = ({ max, min, step, outline, color, defaultVal, onChange, ...props }) => {
  const [value, setValue] = useState(defaultVal);
  const numberInput = useRef(null);
  const addVal = () => {
    if (numberInput.current.value === "") {
      setValue(0);
    } else {
      let n = 1;
      if (value !== max) {
        if (step) {
          n = step;
        }
        setValue(value + n);
        if (onChange) {
          onChange(numberInput.current, value + n);
        }
      }
    }
  };
  const reduceVal = () => {
    if (numberInput.current.value === "") {
      setValue(0);
    } else {
      let n = 1;
      if (value > min) {
        if (step) {
          n = step;
        }
        setValue(value - n);
        if (onChange) {
          onChange(numberInput.current, value - n);
        }
      }
    }
  };

  const handleChangeValue = (e) => {
    let val = parseInt(e.target.value);
    if (val > max || val < min) {
      e.target.value = value;
    } else {
      setValue(val);
      if (onChange) {
        onChange(e.currentTarget, val);
      }
    }
  };

  return (
    <div className="form-control-wrap number-spinner-wrap">
      {" "}
      <Button
        outline={outline ? true : false}
        color={color}
        disabled={value === min ? true : false}
        className="btn-icon number-spinner-btn number-minus"
        onClick={reduceVal}
      >
        <Icon name="minus"></Icon>
      </Button>{" "}
      <input
        type="number"
        className="form-control number-spinner"
        value={value}
        onChange={handleChangeValue}
        max={max}
        min={min}
        ref={numberInput}
        {...props}
      />{" "}
      <Button
        outline={outline ? true : false}
        color={color}
        disabled={value === max ? true : false}
        className="btn-icon number-spinner-btn number-plus"
        onClick={addVal}
      >
        <Icon name="plus"></Icon>
      </Button>{" "}
    </div>
  );
};

export default NSComponent;

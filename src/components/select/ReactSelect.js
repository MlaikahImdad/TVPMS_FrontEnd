import React, {useState} from "react";
import Select from "react-select";

const RSelect = React.forwardRef(({name, ...props },ref) => {
  const [value, setValue] = useState("")
  // console.log(name); // Add this line to check if the name prop is being passed down correctly
  return (
    <div className="form-control-select">
      <Select
        className={`react-select-container ${props.className ? props.className : ""}`}
        classNamePrefix="react-select"
        onChange={e => setValue(e.value)}
        {...props}
      />
      <input name={name} type="hidden" ref={ref} value={value}/>
    </div>
  );
});

export default RSelect;

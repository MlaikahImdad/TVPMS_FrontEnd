import { useState, useEffect } from "react";

const Checkbox = ({name, label, innerRef, ...rest}) => {

  const [id,setId] = useState("")

  useEffect(() => {

    function generateRandomId() {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const length = 8;
      let randomId = '';
    
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomId += characters.charAt(randomIndex);
      }
    
      return randomId;
    }

    setId(name+"_"+generateRandomId())
  },[name])

  return (
    <div className="custom-control custom-checkbox">
      {/* <input {...register(name)} className="custom-control-input" id={name} {...rest} /> */}
      <input  className="custom-control-input" ref={innerRef} value={rest.checked} name={name} id={id} {...rest} />
      <label className="custom-control-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;

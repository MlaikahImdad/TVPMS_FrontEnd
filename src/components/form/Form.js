import React from "react";

export default function Form({ defaultValues, children, schema, useform, onFormSubmit }) {
  const { errors, register, handleSubmit, watch } = useform;
  const validationSchema = schema(watch);

  // useEffect(() => {
  //   console.log(errors)
  // },[errors])

  const hasKey = (obj, key) => {
    return typeof obj === "object" && obj !== null && obj.hasOwnProperty(key);
  };

  const getDefaultValue = (name) => {
    let name_seq = name.split(".");
    let obj = structuredClone(defaultValues);
    for (let seq of name_seq) {
      obj = obj[seq];
    }
    return obj;
  };

  const getElementInfo = (val) => {
    for (let type_key of Object.keys(validationSchema)) {
      if (Object.keys(validationSchema[type_key]).includes(val)) {
        return { type: type_key, validations: validationSchema[type_key][val] };
      }
    }

    throw new Error(val + " not found in the validation schema")
  };

  const buildElement = (ele, key) => {
    let { type, validations } = getElementInfo(ele.props.name);
    let temp = {
      innerRef: register(validations),
      key: key,
    };
    if (ele.type.name !== "Select") {
      temp["type"] = type;
    }

    if (ele.type.name !== "Checkbox") {
      temp["errors"] = errors
      temp["defaultValue"] = getDefaultValue(ele.props.name)
    }

    return React.cloneElement(ele, temp);
  };

  const getChildren = (parents = [], parentKey = "") => {
    let elements = [];

    if (!Array.isArray(parents)) {
      parents = [parents];
    }

    for (let [index, parent] of parents.entries()) {
      if (hasKey(parent, "type")) {
        let currentKey = `${parentKey}-${index}`;
        if (Object.keys(parent.props).includes('name')) {
          elements.push(buildElement(parent, currentKey));
        } else if (parent.props && parent.props.children) {
          let nestedInputs = getChildren(parent.props.children);
          // elements = [...elements, ...nestedInputs];
          elements.push(React.cloneElement(parent, { key: currentKey }, nestedInputs));
        }
      } else {
        elements.push(parent)
      }
      // return parent;
    }

    return elements;
  };



  const rectifyCheckboxes = (data) => {
    const newData = { ...data };

    const recursiveCheck = (obj) => {
      for (const key in obj) {
        if (Array.isArray(obj[key])) {
          if (obj[key].includes("true")) {
            obj[key] = true;
          } else {
            obj[key] = false;
          }
        }
        else if (obj[key] === "true") {
          obj[key] = true
        }
        else if (obj[key] === "false") {
          obj[key] = false
        }
        else if (typeof obj[key] === "object") {
          recursiveCheck(obj[key]);
        }
      }
    };

    recursiveCheck(newData);

    return newData;
  };

  const submit = (form) => {
    let data = rectifyCheckboxes(form)
    // console.log("Rectified form data", data);
    onFormSubmit(data)
  };

  const childElements = getChildren(children);

  return <form onSubmit={handleSubmit(submit)}>{childElements}</form>;
}

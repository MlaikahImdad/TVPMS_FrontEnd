import React, {useState} from "react";
import SimpleBar from "simplebar-react";

import { showAlert } from "src/utils/Utils";
import { Block, BlockHead, BlockTitle, BlockHeadContent, BlockDes } from "src/components/Component";


import { variables } from "./MachineVariables";

import Form from "./MachineForm";
import api from "src/api";


const Add = ({formData,companies,operators,view, setReset,postFormSubmit}) => {

  const [uploading, setUploading] = useState(false)

  const onFormSubmit = (form) => {
    setUploading(true);
    api
      .post(variables.api.create, form)
      .then((res) => {
        api.get(variables.api.index).then((res) => {
          setUploading(false);  
          postFormSubmit(res.data);
          showAlert("success", variables.name + " Successfully Saved.");
        });
      })
      .catch((error) => {
        setUploading(false);
        showAlert("error", `Error: ${error.response.statusText}`);
      });
  };

  return (
    <SimpleBar
      className={`nk-add-product toggle-slide toggle-slide-right toggle-screen-any ${
        view.add ? "content-active" : ""
      }`}
    >
      <BlockHead>
        <BlockHeadContent>
          <BlockTitle tag="h5">Add {variables.name}</BlockTitle>
          <BlockDes>
            <p>Add information or update {variables.name}.</p>
          </BlockDes>
        </BlockHeadContent>
      </BlockHead>
      <Block>
        <Form
          formData={formData}
          onFormSubmit={onFormSubmit}
          companies={companies}
          operators={operators}
          uploading={uploading}
          setReset={setReset}
        />
      </Block>
    </SimpleBar>
  );
};

export default Add;

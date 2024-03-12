import React, {useState } from "react";

import { Icon} from "src/components/Component";
import { showAlert } from "src/utils/Utils";

// import {categoryOptions } from "./ProductData";
import { Modal, ModalBody } from "reactstrap";
import { variables } from "./MachineVariables";

import api from "src/api";
import Form from "./MachineForm";

import { mergeObjects } from "src/utils/Utils";
// import { RSelect } from "src/components/Component";

const Update = ({data, formData, companies, operators, view, onFormCancel, editId, setReset, postFormSubmit }) => {
  const [uploading, setUploading] = useState(false)

  
  const onEditSubmit = (form) => {
    setUploading(true);

    let temp = mergeObjects(form, formData)

    // console.log("edit", form,editId);

    api
      .put(variables.api.update, temp)
      .then((res) => {
        // console.log(res.data)
        api.get(variables.api.show.replace("{id}", editId)).then((res_s) => {
          // console.log(res_s.data)
          let newItems = data;
          let index = newItems.findIndex((item) => item[variables.id] === editId);
          newItems[index] = res_s.data;

          setUploading(false);
          postFormSubmit(newItems,true);

          showAlert("success", `${variables.name}: "${res_s.data.machineName}" Successfully Updated.`);
        });
      })
      .catch((error) => {
        setUploading(false);
        showAlert("error", `Error: ${error.response.statusText}`);
      });
  };

  return (
    <Modal isOpen={view.edit} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
      <ModalBody>
        <a href="#cancel" className="close">
          {" "}
          <Icon
            name="cross-sm"
            onClick={(ev) => {
              ev.preventDefault();
              onFormCancel();
            }}
          ></Icon>
        </a>
        <div className="p-2">
          <h5 className="title">Update {variables.name}</h5>
          <div className="mt-4">
            <Form
              edit={true}
              formData={formData}
              onFormSubmit={onEditSubmit}
              companies={companies}
              operators={operators}
              uploading={uploading}
              setReset={setReset}
            />
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default Update;

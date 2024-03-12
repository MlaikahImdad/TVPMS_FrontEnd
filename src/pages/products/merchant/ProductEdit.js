import React, {  } from "react";

import {
  Icon,
  Row,
  Col,
  Button,
} from "src/components/Component";

// import {categoryOptions } from "./ProductData";
import Dropzone from "react-dropzone";
import { Modal, ModalBody } from "reactstrap";
import { readImg } from "src/utils/Utils";
import { variables } from "./ProductVariables";
// import { RSelect } from "src/components/Component";


const Update = (props) => {
  return (
    <Modal isOpen={props.view.edit} toggle={() => props.onFormCancel()} className="modal-dialog-centered" size="lg">
      <ModalBody>
        <a href="#cancel" className="close">
          {" "}
          <Icon
            name="cross-sm"
            onClick={(ev) => {
              ev.preventDefault();
              props.onFormCancel();
            }}
          ></Icon>
        </a>
        <div className="p-2">
          <h5 className="title">Update {variables.name}</h5>
          <div className="mt-4">
            <form noValidate onSubmit={props.handleSubmit(props.onEditSubmit)}>
              <Row className="g-3">
              
                <Col size="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="newDescription">
                    Display Name
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name="newDescription"
                        onChange={(e) => props.onInputChange(e)}
                        ref={props.register({
                          required: "This field is required",
                        })}
                        defaultValue={props.formData.newDescription}
                      />
                      {props.errors.newDescription && <span className="invalid">{props.errors.newDescription.message}</span>}
                    </div>
                  </div>
                </Col>

                <Col size="12">
                  <Button color="primary" type="submit" loading={props.uploading}>
                    <Icon className="plus"></Icon>
                    <span>Update {variables.name}</span>
                  </Button>
                </Col>
              </Row>
            </form>
          </div>
        </div>
      </ModalBody>
    </Modal>

  );
}

export default Update
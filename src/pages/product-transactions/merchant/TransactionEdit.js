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
import { variables } from "./TransactionVariables";
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
                    <label className="form-label" htmlFor="category">
                    {variables.name} Image
                    </label>
                    <div className="form-control-wrap">
                      <img style={{width:"100px", height: "100px"}} src={readImg(props.formData.productImage)} alt=""></img>
                    </div>
                  </div>
                </Col>
                <Col size="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                    {variables.name} Name
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={(e) => props.onInputChange(e)}
                        ref={props.register({
                          required: "This field is required",
                        })}
                        defaultValue={props.formData.name}
                      />
                      {props.errors.name && <span className="invalid">{props.errors.name.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="productBarCode">
                    {variables.name} Bar Code
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        name="productBarCode"
                        ref={props.register({ required: "This is required" })}
                        className="form-control"
                        defaultValue={props.formData.productBarCode}
                      />
                      {props.errors.productBarCode && <span className="invalid">{props.errors.productBarCode.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="category">
                    {variables.name} Category
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name="category"
                        ref={props.register({ required: "This is required" })}
                        defaultValue={props.formData.category}
                      />
                      {props.errors.category && <span className="invalid">{props.errors.category.message}</span>}
                    </div>
                  </div>
                </Col>
                
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="description">
                    {variables.name} Description
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name="description"
                        onChange={(e) => props.onInputChange(e)}
                        defaultValue={props.formData.description}
                      />
                      {props.errors.description && <span className="invalid">{props.errors.description.message}</span>}
                    </div>
                  </div>
                </Col>
                
                <Col size="6">
                  <label className="form-label" htmlFor="productImage">
                    Change Image
                  </label>
                  <Dropzone id="productImage" className="form-control" onDrop={(acceptedFiles) => props.handleDropChange(acceptedFiles)} maxFiles={1} multiple={false} accept=".png,jpg,.jpeg">
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div {...getRootProps()} className="dropzone upload-zone small bg-lighter my-2 dz-clickable">
                          <input {...getInputProps()} />
                          {props.files.length === 0 && <p>Drag 'n' drop some files here, or click to select files</p>}
                          {props.files.map((file) => (
                            <div
                              key={file.name}
                              className="dz-preprops.view dz-processing dz-image-preprops.view dz-error dz-complete"
                            >
                              <div className="dz-image">
                                <img src={file.preview} alt="preprops.view" />
                              </div>
                            </div>
                          ))}
                          
                        </div>
                      </section>
                    )}
                  </Dropzone>
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
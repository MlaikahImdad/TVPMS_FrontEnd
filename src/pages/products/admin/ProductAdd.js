import React from "react";

import {
  Block,
  BlockHead,
  BlockTitle,
  BlockHeadContent,
  BlockDes,
  Icon,
  Row,
  Col,
  Button,
} from "src/components/Component";
// import { Modal, ModalBody } from "reactstrap";

// import { categoryOptions } from "./ProductData";
import SimpleBar from "simplebar-react";
import Dropzone from "react-dropzone";
import { variables } from "./ProductVariables";
// import { RSelect } from "src/components/Component";

const Add = (props) => {
    return (
      <SimpleBar
        className={`nk-add-product toggle-slide toggle-slide-right toggle-screen-any ${
          props.view.add ? "content-active" : ""
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
          <form onSubmit={props.handleSubmit(props.onFormSubmit)}>
            <Row className="g-3">
              <Col size="12">
                <div className="form-group">
                  <label className="form-label" htmlFor="product-name">
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
                      onChange={(e) => props.onInputChange(e)}
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
                      onChange={(e) => props.onInputChange(e)}
                      ref={props.register({ required: "This is required" })}
                      defaultValue={props.formData.category}
                    />
                    {props.errors.category && <span className="invalid">{props.errors.category.message}</span>}
                  </div>
                </div>
              </Col>
              
              <Col size="12">
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
                      ref={props.register({ required: "This is required" })}
                      defaultValue={props.formData.description}
                    />
                    {props.errors.description && <span className="invalid">{props.errors.description.message}</span>}
                  </div>
                </div>
              </Col>
              <Col size="12">
                <div className="form-control-wrap">
                  <label className="form-label" htmlFor="productImage">
                  {variables.name} Image
                  </label>
                  <Dropzone id="productImage" className="form-control" onDrop={(acceptedFiles) => props.handleDropChange(acceptedFiles)} maxFiles={1} multiple={false} accept=".png, .jpg, .jpeg">
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
                                <img src={file.preview} style={{height:"100px"}} alt="preprops.view" />
                              </div>
                            </div>
                          ))}
                          
                        </div>
                      </section>
                    )}
                  </Dropzone>
                  <input
                      type="hidden"
                      className="form-control"
                    />
                    {props.dropzoneError&& 
                      <span className="invalid">This field is required</span>}
                </div>
              </Col>

              <Col size="12">
                <Button color="primary" loading={props.uploading} type="submit">
                  <Icon className="plus"></Icon>
                  <span>Add {variables.name}</span>
                </Button>
              </Col>
            </Row>
          </form>
        </Block>
      </SimpleBar>
    )
};

export default Add;

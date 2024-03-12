import React from "react";

import { Icon, Row, Col, Button } from "src/components/Component";

// import {categoryOptions } from "./ProductData";
import { Modal, ModalBody } from "reactstrap";
import { variables } from "./CompanyVariables";
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
                    <label className="form-label" htmlFor="websiteUrl">
                      Website
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        name="websiteUrl"
                        ref={props.register({
                          pattern: {
                            value: /^(https?:\/\/)?[^\s/$.?#].[^\s]*$/i,
                            message: "Invalid Website URL",
                          },
                        })}
                        placeholder="http://example.com"
                        className="form-control"
                        defaultValue={props.formData.websiteUrl}
                      />
                      {props.errors.websiteUrl && <span className="invalid">{props.errors.websiteUrl.message}</span>}
                    </div>
                  </div>
                </Col>

                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="focalPersonDetaills">
                      Focal Person
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        name="focalPersonDetaills"
                        ref={props.register()}
                        className="form-control"
                        defaultValue={props.formData.focalPersonDetaills}
                      />
                      {props.errors.focalPersonDetaills && (
                        <span className="invalid">{props.errors.focalPersonDetaills.message}</span>
                      )}
                    </div>
                  </div>
                </Col>

                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="phoneNumber">
                      Phone Number
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name="phoneNumber"
                        ref={props.register({
                          pattern: {
                            value: /^(?:\+92|0)?\d{10}$/i,
                            message: "Invalid Phone Number",
                          },
                        })}
                        placeholder="03XXXXXXXXX"
                        defaultValue={props.formData.phoneNumber}
                      />
                      {props.errors.phoneNumber && <span className="invalid">{props.errors.phoneNumber.message}</span>}
                    </div>
                  </div>
                </Col>

                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="address">
                      Address
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        ref={props.register()}
                        defaultValue={props.formData.address}
                      />
                      {props.errors.address && <span className="invalid">{props.errors.address.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="location">
                      Location Coordinates
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name="location"
                        ref={props.register({
                          // required: "This field is required",
                          pattern: {
                            value: /^-?\d{1,3}\.\d+,\s*-?\d{1,3}\.\d+$/i,
                            message: "Invalid Coordinates",
                          },
                        })}
                        placeholder="51.5074, -0.1278"
                        defaultValue={props.formData.location}
                      />
                      {props.errors.location && <span className="invalid">{props.errors.location.message}</span>}
                    </div>
                  </div>
                </Col>

                <Col md="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="otherInformation">
                      Description
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name="otherInformation"
                        onChange={(e) => props.onInputChange(e)}
                        defaultValue={props.formData.otherInformation}
                      />
                      {props.errors.otherInformation && (
                        <span className="invalid">{props.errors.otherInformation.message}</span>
                      )}
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
};

export default Update;

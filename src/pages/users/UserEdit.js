import React, { useEffect } from "react";

import {
  Icon,
  Row,
  Col,
  Button,
} from "src/components/Component";

// import {categoryOptions } from "./ProductData";
import { Modal, ModalBody } from "reactstrap";
import { variables } from "./UserVariables";
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
                <Col size="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="roleId">
                    Role
                    </label>
                    <div className="form-control-wrap">
                      <div className="form-control-select">
                        <select
                          ref={props.register({
                            required: true,
                          })}
                          className="form-control form-select"
                          id="roleId"
                          name="roleId"
                          placeholder="Select a option"
                          defaultValue={props.formData.roleId}
                        >
                          {/* <option label="Select a topic" value=""></option> */}
                          {props.roles.map((role,key) => {
                            return <option value={role.id} key={key}>{role.role}</option>
                          })}
                          
                        </select>
                        {props.errors.roleId && <span className="invalid">{props.errors.roleId.message}</span>}
                      </div>
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
                        ref={props.register({ required: "This is required" })}
                        defaultValue={props.formData.phoneNumber}
                      />
                      {props.errors.phoneNumber && <span className="invalid">{props.errors.phoneNumber.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                <div className="form-group">
                  <label className="form-label" htmlFor="password">
                   Password
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      onChange={(e) => props.onInputChange(e)}
                      ref={props.register({
                          required: "This field is required",
                      })}
                      defaultValue={props.formData.password}
                    />
                    {props.errors.password && <span className="invalid">{props.errors.password.message}</span>}
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="form-group">
                  <label className="form-label" htmlFor="confirmPassword">
                   Confirm Password
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="password"
                      className="form-control"
                      name="confirmPassword"
                      onChange={(e) => props.onInputChange(e)}
                      ref={props.register({ required: "This is required" , validate: (val) => {
                        if (props.watch('password') !== val){
                          return "Your passwords do no match";
                        }
                      }})}
                      defaultValue={props.formData.confirmPassword}
                    />
                    {props.errors.confirmPassword && <span className="invalid">{props.errors.confirmPassword.message}</span>}
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
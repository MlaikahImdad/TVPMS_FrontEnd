import React, {useEffect, useState} from "react";

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
import { variables } from "./UserVariables";
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
                  <label className="form-label" htmlFor="email">
                  {variables.name} Email
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      name="email"
                      ref={props.register({
                          required: "This field is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address"
                          }
                      })}
                      onChange={(e) => props.onInputChange(e)}
                      className="form-control"
                      defaultValue={props.formData.email}
                    />
                    {props.errors.email && <span className="invalid">{props.errors.email.message}</span>}
                  </div>
                </div>
              </Col>
               {/* <Col md="6">
                <div className="form-group">
                  <label className="form-label" htmlFor="phoneNumber">
                  Phone Number
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      name="phoneNumber"
                      ref={props.register({
                          required: "This field is required",
                      })}
                      onChange={(e) => props.onInputChange(e)}
                      className="form-control"
                      defaultValue={props.formData.phoneNumber}
                    />
                    {props.errors.phoneNumber && <span className="invalid">{props.errors.phoneNumber.message}</span>}
                  </div>
                </div>
              </Col>  */}
              
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
              {/* <Col size="6">
                <div className="form-group">
                  <label className="form-label" htmlFor="roleId">
                  {variables.name} Role
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
                        {/* {props.roles.map((role,key) => {
                          return <option value={role.id} key={key}>{role.role}</option>
                        })}
                        
                      </select>
                      {props.errors.roleId && <span className="invalid">{props.errors.roleId.message}</span>}
                    </div>
                  </div>
                </div>
              </Col> */} 
             <Col size="12">
                <div className="form-group">
                  <label className="form-label" htmlFor="product-name">
                  {variables.name} Role 
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      className="form-control"
                      name="role"
                      onChange={(e) => props.onInputChange(e)}
                      ref={props.register({
                        required: "This field is required",
                      })}
                      defaultValue={props.formData.role}
                    />
                    {props.errors.role && <span className="invalid">{props.errors.role.message}</span>}
                  </div>
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

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
import { variables } from "./MachineVariables";
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
                      name="machineName"
                      onChange={(e) => props.onInputChange(e)}
                      ref={props.register({
                        required: "This field is required",
                      })}
                      defaultValue={props.formData.machineName}
                    />
                    {props.errors.machineName && <span className="invalid">{props.errors.machineName.message}</span>}
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="form-group">
                  <label className="form-label" htmlFor="totalSlots">
                    Total Slots
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="number"
                      name="totalSlots"
                      ref={props.register({ required: "This is required" })}
                      onChange={(e) => props.onInputChange(e)}
                      className="form-control"
                      defaultValue={props.formData.totalSlots}
                    />
                    {props.errors.totalSlots && <span className="invalid">{props.errors.totalSlots.message}</span>}
                  </div>
                </div>
              </Col>
              <Col size="6">
                <div className="form-group">
                  <label className="form-label" htmlFor="companyId">
                  {variables.name} Company
                  </label>
                  <div className="form-control-wrap">
                    <div className="form-control-select">
                      <select
                        ref={props.register()}
                        className="form-control form-select"
                        id="companyId"
                        name="companyId"
                        placeholder="Select a option"
                        defaultValue={props.formData.companyId}
                      >
                        {/* <option label="Select a topic" value=""></option> */}
                        {props.companies.map((company,key) => {
                          return <option value={company.companyId} key={key}>{company.name}</option>
                        })}
                        
                      </select>
                      {props.errors.companyId && <span className="invalid">{props.errors.companyId.message}</span>}
                    </div>
                  </div>
                </div>
              </Col>
              <Col size="6">
                <div className="form-group">
                  <label className="form-label" htmlFor="location">
                    Location
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      className="form-control"
                      name="location"
                      onChange={(e) => props.onInputChange(e)}
                      ref={props.register()}
                      defaultValue={props.formData.location}
                    />
                    {props.errors.location && <span className="invalid">{props.errors.location.message}</span>}
                  </div>
                </div>
              </Col>
              <Col size="6">
                <div className="form-group">
                  <label className="form-label" htmlFor="macAddress">
                    Mac Address
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      className="form-control"
                      name="macAddress"
                      onChange={(e) => props.onInputChange(e)}
                      ref={props.register()}
                      defaultValue={props.formData.macAddress}
                    />
                    {props.errors.macAddress && <span className="invalid">{props.errors.macAddress.message}</span>}
                  </div>
                </div>
              </Col>
              <Col size="6">
                <div className="form-group">
                  <label className="form-label" htmlFor="visaQR">
                    Visa QR
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      className="form-control"
                      name="visaQR"
                      onChange={(e) => props.onInputChange(e)}
                      ref={props.register()}
                      defaultValue={props.formData.visaQR}
                    />
                    {props.errors.visaQR && <span className="invalid">{props.errors.visaQR.message}</span>}
                  </div>
                </div>
              </Col>
              <Col size="6">
                <div className="form-group">
                  <label className="form-label" htmlFor="master_QR_PAN">
                    Master QR Pan
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      className="form-control"
                      name="master_QR_PAN"
                      onChange={(e) => props.onInputChange(e)}
                      ref={props.register()}
                      defaultValue={props.formData.master_QR_PAN}
                    />
                    {props.errors.master_QR_PAN && <span className="invalid">{props.errors.master_QR_PAN.message}</span>}
                  </div>
                </div>
              </Col>
              <Col size="6">
                <div className="form-group">
                  <label className="form-label" htmlFor="qR_ChargesPercentage">
                    QR Charges Percentage
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="number"
                      className="form-control"
                      name="qR_ChargesPercentage"
                      onChange={(e) => props.onInputChange(e)}
                      ref={props.register()}
                      defaultValue={props.formData.qR_ChargesPercentage}
                    />
                    {props.errors.qR_ChargesPercentage && <span className="invalid">{props.errors.qR_ChargesPercentage.message}</span>}
                  </div>
                </div>
              </Col>
              <Col size="6">
                <div className="form-group">
                  <label className="form-label" htmlFor="poS_ECR_Id">
                    POS ECR ID
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      className="form-control"
                      name="poS_ECR_Id"
                      onChange={(e) => props.onInputChange(e)}
                      ref={props.register()}
                      defaultValue={props.formData.poS_ECR_Id}
                    />
                    {props.errors.poS_ECR_Id && <span className="invalid">{props.errors.poS_ECR_Id.message}</span>}
                  </div>
                </div>
              </Col>
              <Col size="6">
                <div className="form-group">
                  <label className="form-label" htmlFor="poS_ChargesPercentage">
                    POS Charges Percentage
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="number"
                      className="form-control"
                      name="poS_ChargesPercentage"
                      onChange={(e) => props.onInputChange(e)}
                      ref={props.register()}
                      defaultValue={props.formData.poS_ChargesPercentage}
                    />
                    {props.errors.poS_ChargesPercentage && <span className="invalid">{props.errors.poS_ChargesPercentage.message}</span>}
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="form-group">
                  <label className="form-label" htmlFor="remarks">
                  {variables.name} Remarks
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      className="form-control"
                      name="remarks"
                      onChange={(e) => props.onInputChange(e)}
                      ref={props.register({})}
                      defaultValue={props.formData.remarks}
                    />
                    {props.errors.remarks && <span className="invalid">{props.errors.remarks.message}</span>}
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

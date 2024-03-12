import React from "react";
import { Icon, Row, Col } from "src/components/Component";
// import { Badge } from "reactstrap";
import { Modal, ModalBody } from "reactstrap";

import { variables } from "./MachineVariables";

const Show = (props) => {
  const fd = props.formData;
  const mc = fd.machineConfiguration;

  return (
    <Modal isOpen={props.view.details} toggle={() => props.onFormCancel()} className="modal-dialog-centered" size="lg">
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
        <div className="nk-modal-head">
          <h4 className="nk-modal-title title">
            {variables.name} <small className="text-primary">#{fd["machineCode"]}</small>
          </h4>
        </div>
        <div className="nk-tnx-details mt-sm-3">
          <Row className="gy-3">
            <Col lg={4}>
              <span className="sub-text">Name</span>
              <span className="caption-text">{fd.machineName}</span>
            </Col>
            <Col lg={4}>
              <span className="sub-text">Company</span>
              <span className="caption-text">
                {" "}
                {((companyId) => {
                  let name = "";
                  let temp = props.companies.filter((company) => company.companyId === companyId);
                  if (temp.length > 0) {
                    name = temp[0].name;
                  }
                  return name;
                })(fd.companyId)}
              </span>
            </Col>
            <Col lg={4}>
              <span className="sub-text">Total Slots</span>
              <span className="caption-text">{fd.totalSlots}</span>
            </Col>
            <Col lg={4}>
              <span className="sub-text">Mac Address</span>
              <span className="caption-text">{fd.macAddress}</span>
            </Col>

            <Col lg={4}>
              <span className="sub-text">Location Coordinates</span>
              <span className="caption-text">{mc ? mc.location : ""}</span>
            </Col>
            <Col lg={4}>
              <span className="sub-text">Operator</span>
              <span className="caption-text"> {mc ? mc.operatorName : ""}</span>
            </Col>

            <Col lg={6}>
              <span className="sub-text">Helpline</span>
              <span className="caption-text">{fd.helpLineNumber}</span>
            </Col>
            <Col lg={6}>
              <span className="sub-text">Remarks</span>
              <span className="caption-text">{fd.remarks}</span>
            </Col>

            <Col md="12">
              <Row className="gy-4">
                <Col lg={4}>
                  <span className="sub-text">Cash</span>
                  <span className="caption-text">{mc ? (mc.isCash ? "True" : "False") : ""}</span>
                </Col>
                <Col lg={4}>
                  <span className="sub-text">Vending Pay</span>
                  <span className="caption-text">{mc ? (mc.isVendingPay ? "True" : "False") : ""}</span>
                </Col>
                <Col lg={4}>
                  <span className="sub-text">Visa QR</span>
                  <span className="caption-text">{mc ? (mc.isVisaQR ? "True" : "False") : ""}</span>
                </Col>
                <Col lg={4}>
                  <span className="sub-text">Master QR</span>
                  <span className="caption-text">{mc ? (mc.isMasterQR ? "True" : "False") : ""}</span>
                </Col>
                <Col lg={4}>
                  <span className="sub-text">POS ESR</span>
                  <span className="caption-text">{mc ? (mc.isPOS_ECR ? "True" : "False") : ""}</span>
                </Col>
              </Row>
            </Col>
            {mc && mc.isVendingPay && (
              <React.Fragment>
                <Col lg={6}>
                  <span className="sub-text">Vending Pay Pan</span>
                  <span className="caption-text">{mc ? mc.vendingPay_PAN : ""}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Vending Pay Percentage</span>
                  <span className="caption-text">{mc ? mc.vendingPay_ChargesPercentage : ""}</span>
                </Col>
              </React.Fragment>
            )}
            {mc && mc.isVisaQR && (
              <React.Fragment>
                <Col lg={6}>
                  <span className="sub-text">Visa QR PAN</span>
                  <span className="caption-text">{mc ? mc.visaQR_PAN : ""}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Visa Percentage</span>
                  <span className="caption-text">{mc ? mc.visaQR_ChargesPercentage : ""}</span>
                </Col>
              </React.Fragment>
            )}
            {mc && mc.isMasterQR && (
              <React.Fragment>
                <Col lg={6}>
                  <span className="sub-text">Master QR PAN</span>
                  <span className="caption-text">{mc ? mc.masterQR_PAN : ""}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Master Percentage</span>
                  <span className="caption-text">{mc ? mc.masterQR_ChargesPercentage : ""}</span>
                </Col>
              </React.Fragment>
            )}
            {mc && mc.isPOS_ECR && (
              <React.Fragment>
                <Col lg={6}>
                  <span className="sub-text">POS ECR ID</span>
                  <span className="caption-text">{mc ? mc.poS_ECR_Id : ""}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">POS Percentage</span>
                  <span className="caption-text">{mc ? mc.poS_ChargesPercentage : ""}</span>
                </Col>
              </React.Fragment>
            )}
          </Row>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default Show;

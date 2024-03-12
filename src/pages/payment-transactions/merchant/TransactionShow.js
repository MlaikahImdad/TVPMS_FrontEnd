import React, { useState, useEffect } from "react";
import { Icon, ReactDataTable, PreviewCard, UserAvatar, Row, Col } from "src/components/Component";
// import { Badge } from "reactstrap";
import { Modal, ModalBody } from "reactstrap";
import { readImg, NoImage, beautifyDate } from "src/utils/Utils";

import { variables } from "./TransactionVariables";

const Show = ({ ...props }) => {


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
            {variables.name} <small className="text-primary">#{props.formData[variables.id]}</small>
          </h4>
        </div>
        <div className="nk-tnx-details mt-sm-3">
          <Row className="gy-3">
            <Col lg={6}>
              <span className="sub-text">Company Id</span>
              <span className="caption-text">{props.formData.companyId}</span>
            </Col>
            <Col lg={6}>
              <span className="sub-text">Machine Id</span>
              <span className="caption-text">{props.formData.machineId}</span>
            </Col>
            <Col lg={6}>
              <span className="sub-text">Sale No</span>
              <span className="caption-text"> {props.formData.saleNo}</span>
            </Col>
            <Col lg={6}>
              <span className="sub-text">Payment Method</span>
              <span className="caption-text"> {props.formData.paymentMethod}</span>
            </Col>
            <Col lg={6}>
              <span className="sub-text">Transaction Amount</span>
              <span className="caption-text"> {props.formData.transactionAmount}</span>
            </Col>
            <Col lg={6}>
              <span className="sub-text">Payment Direction</span>
              <span className="caption-text"> {props.formData.paymentDirection}</span>
            </Col>
            <Col lg={6}>
              <span className="sub-text">Payment Info</span>
              <span className="caption-text"> {props.formData.paymentInfo}</span>
            </Col>
            <Col lg={6}>
              <span className="sub-text">Transaction Time</span>
              <span className="caption-text"> {beautifyDate(props.formData.readDateTime)}</span>
            </Col>
          </Row>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default Show;

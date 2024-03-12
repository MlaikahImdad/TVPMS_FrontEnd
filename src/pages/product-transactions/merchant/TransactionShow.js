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
          <img style={{ width: "100px", height: "100px" }} src={props.formData.productImage ? readImg(props.formData.productImage) : NoImage} alt="" />
        </div>
        <div className="nk-tnx-details mt-sm-3">
          <Row className="gy-3">
            <Col lg={6}>
              <span className="sub-text">Name</span>
              <span className="caption-text">{props.formData.name}</span>
            </Col>
            <Col lg={6}>
              <span className="sub-text">Bar Code</span>
              <span className="caption-text">{props.formData.productBarCode}</span>
            </Col>
            <Col lg={6}>
              <span className="sub-text">Category</span>
              <span className="caption-text">{props.formData.category}</span>
            </Col>
            <Col lg={6}>
              <span className="sub-text">Machine ID</span>
              <span className="caption-text"> {props.formData.machineId}</span>
            </Col>
            <Col lg={6}>
              <span className="sub-text">Sale No</span>
              <span className="caption-text"> {props.formData.saleNo}</span>
            </Col>
            <Col lg={6}>
              <span className="sub-text">Slot Id</span>
              <span className="caption-text"> {props.formData.slotId}</span>
            </Col>
            <Col lg={6}>
              <span className="sub-text">Product Code</span>
              <span className="caption-text"> {props.formData.productCode}</span>
            </Col>
            <Col lg={6}>
              <span className="sub-text">Product Price</span>
              <span className="caption-text"> {props.formData.productPrice}</span>
            </Col>
            <Col lg={6}>
              <span className="sub-text">Dispense Status</span>
              <span className="caption-text"> {props.formData.dispenseStatus}</span>
            </Col>
            <Col lg={6}>
              <span className="sub-text">Transaction Time</span>
              <span className="caption-text"> {beautifyDate(props.formData.transactionDateTime)}</span>
            </Col>
            <Col lg={6}>
              <span className="sub-text">New Description</span>
              <span className="caption-text"> {props.formData.newDescription}</span>
            </Col>
          </Row>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default Show;

import React, { } from "react";
import {
  Icon,
  Row,
  Col,
} from "src/components/Component";
// import { Badge } from "reactstrap";
import { Modal, ModalBody } from "reactstrap";
import { readImg, NoImage } from "src/utils/Utils";

import { variables } from "./ProductVariables";


const Show = (props) => {
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
                <img style={{width:"100px",height:"100px"}} src={props.formData.productImage? readImg(props.formData.productImage): NoImage} alt="" />
            </div>
            <div className="nk-tnx-details mt-sm-3">
                <Row className="gy-3">
                <Col lg={6}>
                    <span className="sub-text">{variables.name} Name</span>
                    <span className="caption-text">{props.formData.name}</span>
                </Col>
                <Col lg={6}>
                    <span className="sub-text">{variables.name} Bar Code</span>
                    <span className="caption-text">{props.formData.productBarCode}</span>
                </Col>
                <Col lg={6}>
                    <span className="sub-text">{variables.name} Category</span>
                    <span className="caption-text">{props.formData.category}</span>
                </Col>
                <Col lg={6}>
                    <span className="sub-text">{variables.name} Description</span>
                    <span className="caption-text"> {props.formData.description}</span>
                </Col>
                </Row>
            </div>
            </ModalBody>
        </Modal>

    )
}

export default Show;
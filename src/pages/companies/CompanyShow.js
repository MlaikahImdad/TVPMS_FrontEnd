import React, { } from "react";
import {
  Icon,
  Row,
  Col,
} from "src/components/Component";
// import { Badge } from "reactstrap";
import { Modal, ModalBody } from "reactstrap";
import { variables } from "./CompanyVariables";


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
            </div>
            <div className="nk-tnx-details mt-sm-3">
                <Row className="gy-3">
                <Col lg={6}>
                    <span className="sub-text">{variables.name} Name</span>
                    <span className="caption-text">{props.formData.name}</span>
                </Col>
                <Col lg={6}>
                    <span className="sub-text">{variables.name} Website</span>
                    <span className="caption-text">{props.formData.websiteUrl}</span>
                </Col>
                <Col lg={6}>
                    <span className="sub-text">Focal Person</span>
                    <span className="caption-text">{props.formData.focalPersonDetaills}</span>
                </Col>
                <Col lg={6}>
                    <span className="sub-text">Phone Number</span>
                    <span className="caption-text"> {props.formData.phoneNumber}</span>
                </Col>
                <Col lg={6}>
                    <span className="sub-text">Address</span>
                    <span className="caption-text">{props.formData.address}</span>
                </Col>
                <Col lg={6}>
                    <span className="sub-text">Location</span>
                    <span className="caption-text">{props.formData.location}</span>
                </Col>
                <Col lg={12}>
                    <span className="sub-text">Description</span>
                    <span className="caption-text"> {props.formData.otherInformation}</span>
                </Col>
                </Row>
            </div>
            </ModalBody>
        </Modal>

    )
}

export default Show;
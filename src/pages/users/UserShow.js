import React, { } from "react";
import {
  Icon,
  Row,
  Col,
} from "src/components/Component";
// import { Badge } from "reactstrap";
import { Modal, ModalBody } from "reactstrap";

import { variables } from "./UserVariables";


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
                    <span className="sub-text">{variables.name} Email</span>
                    <span className="caption-text">{props.formData.email}</span>
                </Col>
                {/* /* <Col lg={6}>
                    <span className="sub-text">Phone Number</span>
                    <span className="caption-text">{props.formData.phoneNumber}</span>
            </Col> */ }
                <Col lg={6}>
                    
                    
                </Col>
                <Col lg={6}>
                    <span className="sub-text">Role</span>
                    <span className="caption-text"> {
                        ((roleId) => {
                            let name = ""
                            let temp = props.roles.filter(role => role.id === roleId)
                            if (temp.length > 0){
                              name = temp[0].role
                            }
                            return name
                        })(props.formData.roleId)
                    }</span>
                </Col>
                </Row>
            </div>
            </ModalBody>
        </Modal>

    )
}

export default Show;
import React, { useEffect, useState } from "react";

import { Icon, Row, Col, Button, Form, Input, Select, Checkbox } from "src/components/Component";

// import {categoryOptions } from "./ProductData";
import { Modal, ModalBody } from "reactstrap";
import { variables } from "./MachineVariables";
// import { RSelect } from "src/components/Component";

const schema = (watch) => {
  return {
    text: {
      machineName: { required: "This field is required" },
      macAddress: {},
      "machineConfiguration.location": {
        pattern: {
          value:
            /^(-?(?:90(?:\.0{1,6})?|(?:[0-8]?\d(?:\.\d{1,6})?)))\s*,\s*(-?(?:180(?:\.0{1,6})?|(?:1[0-7]\d|0?\d{1,2})(?:\.\d{1,6})?))$/i,
          message: "Invalid format or value range (latitude, longitude)",
        },
      },
      remarks: {},
      helpLineNumber: {}
    },
    password: {
      "machineConfiguration.machinePassword": { required: "This field is required" },
      confirmPassword: {
        validate: (val) => {
          if (watch("machineConfiguration.machinePassword") !== val) {
            return "Your passwords do no match";
          }
        },
      },
    },
    number: {
      totalSlots: { required: "This field is required" },
    },
    select: {
      companyId: { required: "This field is required" },
      "machineConfiguration.operatorId": { required: "This field is required" },
    },
    checkbox: {
      "machineConfiguration.isCash": {},
      "machineConfiguration.isVendingPay": {},
      "machineConfiguration.isVisaQR": {},
      "machineConfiguration.isMasterQR": {},
      "machineConfiguration.isPOS_ECR": {},
    },
  };
};

const Update = (props) => {
  const [mc, setMC] = useState(props.formData.machineConfiguration);

  const [isCash, setIsCash] = useState(false);
  const [isVendingPay, setIsVendingPay] = useState(false);
  const [isVisaQR, setIsVisaQR] = useState(false);
  const [isMasterQR, setIsMasterQR] = useState(false);
  const [isPOS_ECR, setIsPOS_ECR] = useState(false);

  useEffect(() => {
    setMC(props.formData.machineConfiguration);
  }, [props.formData]);

  useEffect(() => {
    if (mc) {
      setIsCash(mc.isCash);
      setIsVendingPay(mc.isVendingPay);
      setIsVisaQR(mc.isVisaQR);
      setIsMasterQR(mc.isMasterQR);
      setIsPOS_ECR(mc.isPOS_ECR);
    }
  }, [mc]);


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
            <Form
              schema={schema}
              useform={props.useform}
              defaultValues={props.formData}
              onFormSubmit={props.onEditSubmit}
            >
              <Row className="g-3">
                <Col size="12">
                  <Input label="Name" name="machineName" />
                </Col>
                <Col md="6">
                  <Input label="Password" name="machineConfiguration.machinePassword" />
                </Col>
                <Col md="6">
                  <Input label="Confirm Password" name="confirmPassword" />
                </Col>
                <Col md="6">
                  <Input label="Total Slots" name="totalSlots" readOnly />
                </Col>
                <Col size="6">
                  <Select label="Operators" name="machineConfiguration.operatorId">
                    <option label="Select Operator" value=""></option>
                    {props.operators.map((operator, key) => {
                      return (
                        <option value={operator.id} key={key}>
                          {operator.name}
                        </option>
                      );
                    })}
                  </Select>
                </Col>

                <Col md="6">
                  <Input
                    label="Location Coordinates"
                    name="machineConfiguration.location"
                    placeholder="51.5074, -0.1278"
                  />
                </Col>

                <Col md="6">
                  <Input label="Mac Address" name="macAddress" />
                </Col>

                <Col md="6">
                  <Input label="Helpline" name="helpLineNumber" />
                </Col>
                <Col md="6">
                  <Input label="Remarks" name="remarks" />
                </Col>

                <Col md="12">
                  <Row className="gy-4">
                    <Col sm="6" md="3">
                      <Checkbox
                        label="Cash"
                        name="machineConfiguration.isCash"
                        checked={isCash}
                        onChange={(e) => {
                          setIsCash(e.target.checked);
                        }}
                      />
                    </Col>
                    <Col sm="6" md="3">
                      <Checkbox
                        label="Vending Pay"
                        name="machineConfiguration.isVendingPay"
                        checked={isVendingPay}
                        onChange={(e) => {
                          setIsVendingPay(e.target.checked);
                        }}
                      />
                    </Col>
                    <Col sm="6" md="3">
                      <Checkbox
                        label="Visa QR"
                        name="machineConfiguration.isVisaQR"
                        checked={isVisaQR}
                        onChange={(e) => {
                          setIsVisaQR(e.target.checked);
                        }}
                      />
                    </Col>
                    <Col sm="6" md="3">
                      <Checkbox
                        label="Master QR"
                        name="machineConfiguration.isMasterQR"
                        checked={isMasterQR}
                        onChange={(e) => {
                          setIsMasterQR(e.target.checked);
                        }}
                      />
                    </Col>
                    <Col sm="6" md="3">
                      <Checkbox
                        label="POS ECR"
                        name="machineConfiguration.isPOS_ECR"
                        checked={isPOS_ECR}
                        onChange={(e) => {
                          setIsPOS_ECR(e.target.checked);
                        }}
                      />
                    </Col>
                  </Row>
                </Col>

                <Col size="12">
                  <Button color="primary" type="submit" loading={props.uploading}>
                    <Icon className="plus"></Icon>
                    <span>Update {variables.name}</span>
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default Update;

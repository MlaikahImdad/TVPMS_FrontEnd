import React, { useState, useEffect } from "react";

import { Icon, Row, Col, Button, Input, Select, Checkbox, Form } from "src/components/Component";
import { useForm } from "react-hook-form";
import { variables } from "./MachineVariables";

const schema = (watch) => {
  return {
    text: {
      machineName: { required: "This field is required" },
      macAddress: {},
      "machineConfiguration.location": {
        // pattern: {
        //   value:
        //     /^(-?(?:90(?:\.0{1,6})?|(?:[0-8]?\d(?:\.\d{1,6})?)))\s*,\s*(-?(?:180(?:\.0{1,6})?|(?:1[0-7]\d|0?\d{1,2})(?:\.\d{1,6})?))$/i,
        //   message: "Invalid format or value range (latitude, longitude)",
        // },
      },

      "machineConfiguration.vendingPay_PAN": {},
      "machineConfiguration.visaQR_PAN": {},
      "machineConfiguration.masterQR_PAN": {},
      "machineConfiguration.poS_ECR_Id": {},
      remarks: {},
      helpLineNumber: {},
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
      "machineConfiguration.vendingPay_ChargesPercentage": {},
      "machineConfiguration.visaQR_ChargesPercentage": {},
      "machineConfiguration.masterQR_ChargesPercentage": {},
      "machineConfiguration.poS_ChargesPercentage": {},
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

const MForm = ({ edit, formData, onFormSubmit, companies, operators, uploading, setReset }) => {
  const useform = useForm();
  const { reset } = useform;

  const [mc, setMC] = useState(formData.machineConfiguration);

  const [isCash, setIsCash] = useState(false);
  const [isVendingPay, setIsVendingPay] = useState(false);
  const [isVisaQR, setIsVisaQR] = useState(false);
  const [isMasterQR, setIsMasterQR] = useState(false);
  const [isPOS_ECR, setIsPOS_ECR] = useState(false);

  useEffect(() => {
    setMC(formData.machineConfiguration);
  }, [formData]);

  useEffect(() => {
    setReset(() => {
      return reset;
    });
  }, [setReset, reset]);

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
    <Form schema={schema} useform={useform} defaultValues={formData} onFormSubmit={onFormSubmit}>
      <Row className="g-3">
        <Col size="6">
          <Input label="Name" name="machineName" />
        </Col>
        <Col size="6">
          <Select name="companyId" label="Company" disabled={edit}>
            <option label="Select Company" value=""></option>
            {companies.map((company, key) => {
              return (
                <option value={company.companyId} key={key}>
                  {company.name}
                </option>
              );
            })}
          </Select>
        </Col>
        <Col md="6">
          <Input label="Total Slots" name="totalSlots" />
        </Col>
        <Col size="6">
          <Input label="Mac Address" name="macAddress" />
        </Col>

        <Col md="6">
          <Input label="Location Coordinates" name="machineConfiguration.location" placeholder="51.5074, -0.1278" />
        </Col>

        <Col size="6">
          <Select label="Operators" name="machineConfiguration.operatorId">
            <option label="Select Operator" value=""></option>
            {operators.map((operator, key) => {
              return (
                <option value={operator.id} key={key}>
                  {operator.name}
                </option>
              );
            })}
          </Select>
        </Col>

        <Col md="6">
          <Input label="Password" name="machineConfiguration.machinePassword" />
        </Col>
        <Col md="6">
          <Input label="Confirm Password" name="confirmPassword" />
        </Col>

        <Col md="6">
          <Input label="Helpline" name="helpLineNumber" />
        </Col>
        <Col md="6">
          <Input label="Remarks" name="remarks" />
        </Col>

        {/* PAN INFORMATION */}

        <Col md="12">
          <Row className="gy-4">
            <Col sm="6" md="4">
              <Checkbox
                label="Cash"
                name="machineConfiguration.isCash"
                checked={isCash}
                onChange={(e) => {
                  setIsCash(e.target.checked);
                }}
              />
            </Col>
            <Col sm="6" md="4">
              <Checkbox
                label="Vending Pay"
                name="machineConfiguration.isVendingPay"
                checked={isVendingPay}
                onChange={(e) => {
                  setIsVendingPay(e.target.checked);
                }}
              />
            </Col>
            <Col sm="6" md="4">
              <Checkbox
                label="Visa QR"
                name="machineConfiguration.isVisaQR"
                checked={isVisaQR}
                onChange={(e) => {
                  setIsVisaQR(e.target.checked);
                }}
              />
            </Col>
            <Col sm="6" md="4">
              <Checkbox
                label="Master QR"
                name="machineConfiguration.isMasterQR"
                checked={isMasterQR}
                onChange={(e) => {
                  setIsMasterQR(e.target.checked);
                }}
              />
            </Col>
            <Col sm="6" md="4">
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

        {/* VENDING PAY */}

        {isVendingPay && (
          <React.Fragment>
            <Col md="6">
              <Input label="Vending Pay PAN" name="machineConfiguration.vendingPay_PAN" />
            </Col>

            <Col md="6">
              <Input label="Vending Pay Percentage" name="machineConfiguration.vendingPay_ChargesPercentage" />
            </Col>
          </React.Fragment>
        )}

        {/* VISA QR */}

        {isVisaQR && (
          <React.Fragment>
            <Col md="6">
              <Input label="Visa QR PAN" name="machineConfiguration.visaQR_PAN" />
            </Col>

            <Col md="6">
              <Input label="Visa Percentage" name="machineConfiguration.visaQR_ChargesPercentage" />
            </Col>
          </React.Fragment>
        )}

        {/* Master QR */}
        {isMasterQR && (
          <React.Fragment>
            <Col md="6">
              <Input label="Master QR PAN" name="machineConfiguration.masterQR_PAN" />
            </Col>

            <Col md="6">
              <Input label="Master Percentage" name="machineConfiguration.masterQR_ChargesPercentage" />
            </Col>
          </React.Fragment>
        )}

        {/* POS eCR */}
        {isPOS_ECR && (
          <React.Fragment>
            <Col md="6">
              <Input label="POS ECR ID" name="machineConfiguration.poS_ECR_Id" />
            </Col>

            <Col md="6">
              <Input label="POS Percentage" name="machineConfiguration.poS_ChargesPercentage" />
            </Col>
          </React.Fragment>
        )}

        <Col size="12">
          <Button color="primary" loading={uploading} type="submit">
            <Icon className="plus"></Icon>
            <span>
              {edit ? "Update" : "Add"} {variables.name}
            </span>
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default MForm;

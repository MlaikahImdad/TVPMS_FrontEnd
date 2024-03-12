import React, { useState, useEffect } from "react";
import { Icon, ReactDataTable, PreviewCard, UserAvatar, Row, Col } from "src/components/Component";
// import { Badge } from "reactstrap";
import { Modal, ModalBody } from "reactstrap";
import { readImg, NoImage, beautifyDate } from "src/utils/Utils";

import { variables } from "./TransactionVariables";
import api from "src/api";

const Show = ({ ...props }) => {
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [data, setData] = useState([]);

  const productColumns = [
    {
      name: "Product",
      selector: (row) => row.name,
      cell: (row) => (
        <div className="user-card mt-2 mb-2">
          <UserAvatar
            theme="primary"
            width="40px"
            height="40px"
            text={row.name}
            image={row.productImage ? readImg(row.productImage) : NoImage}
          ></UserAvatar>

          <div className="user-info">
            <span className="tb-lead">{row.name}</span>
          </div>
        </div>
      ),
    },
    {
      name: "Code",
      selector: (row) => row.productCode,
      width: "70px",
    },
    {
      name: "Price",
      selector: (row) => row.productPrice,
      width: "70px",
    },
    {
      name: "Status",
      selector: (row) => row.dispenseStatus,
      width: "70px",
    },
    {
      name: "Date Time",
      selector: (row) => beautifyDate(row.transactionDateTime),
    },
  ];

  const paymentColumns = [
    {
      name: "Payment Method",
      selector: (row) => row.paymentMethod,
    },
    {
      name: "Amount",
      selector: (row) => row.transactionAmount,
    },
    {
      name: "Direction",
      selector: (row) => row.paymentDirection,
    },
    {
      name: "Info",
      selector: (row) => row.paymentInfo,
    },
    {
      name: "Date Time",
      selector: (row) => beautifyDate(row.readDateTime),
    },
  ];

  useEffect(() => {
    if (props.formData[variables.id]) {
      setLoading(true);
      api.get("/SalesTransaction/" + props.formData[variables.id]).then((res) => {
        setData(res.data);
        setProductData(res.data.productTransactions);
        setPaymentData(res.data.paymentsTransactions);
        setLoading(false);
      });
    }
  }, [props.formData]);

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
              <span className="sub-text">Date Time</span>
              <span className="caption-text">{beautifyDate(data.saleDate)}</span>
            </Col>
            <Col lg={6}>
              <span className="sub-text">Sale No</span>
              <span className="caption-text">{data.saleNo}</span>
            </Col>
            <Col lg={3}>
              <span className="sub-text">Machine Code</span>
              <span className="caption-text">{data.machineCode}</span>
            </Col>
            <Col lg={3}>
              <span className="sub-text">Machine Name</span>
              <span className="caption-text">{data.machineName}</span>
            </Col>
            <Col lg={3}>
              <span className="sub-text">Gender</span>
              <span className="caption-text">{data.gender}</span>
            </Col>
            <Col lg={3}>
              <span className="sub-text">Age</span>
              <span className="caption-text">{data.age}</span>
            </Col>
            <Col lg={3}>
              <span className="sub-text">Purchase</span>
              <span className="caption-text">{data.purchaseAmount}</span>
            </Col>
            <Col lg={3}>
              <span className="sub-text">Paid</span>
              <span className="caption-text">{data.paidAmount}</span>
            </Col>
            <Col lg={3}>
              <span className="sub-text">Balance</span>
              <span className="caption-text">{data.balanceAmount}</span>
            </Col>
          </Row>
          <Row className="g-3">
            <PreviewCard>
              <h5 className="ff-base fw-medium"> Payments</h5>
              <ReactDataTable loading={loading} data={paymentData} columns={paymentColumns} />
            </PreviewCard>
          </Row>
          <Row className="g-3">
            <PreviewCard>
              <h5 className="ff-base fw-medium"> Products</h5>
              <ReactDataTable loading={loading} data={productData} columns={productColumns} />
            </PreviewCard>
          </Row>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default Show;

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
      name: "Product",
      selector: (row) => row.productCode+": "+row.name,
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
        let prod_trans = res.data.productTransactions;
        let payment_trans = res.data.paymentsTransactions;

        setProductData(prod_trans);
        setPaymentData(payment_trans);
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
          <div className="invoice">
            {/* <div className="invoice-action">
              <Link to={`${process.env.PUBLIC_URL}/invoice-print/${user.id}`} target="_blank">
                <Button size="lg" color="primary" outline className="btn-icon btn-white btn-dim">
                  <Icon name="printer-fill"></Icon>
                </Button>
              </Link>
            </div> */}
            <div className="invoice-wrap">
              {/* <div className="invoice-brand text-center">
                <img src={LogoDark} alt="" />
              </div> */}

              <div className="invoice-head">
                <div className="invoice-contact">
                  <span className="overline-title">Machine</span>
                  <div className="invoice-contact-info invoice-desc">
                    <h4 className="title">
                      {data.machineCode} - {data.machineName}
                    </h4>
                    <ul className="list-plain">

                      <li className="invoice-id">
                        <span>Sale No</span>:<span>{data.saleNo}</span>
                      </li>
                      <li className="invoice-date">
                        <span>Time</span>:<span>{beautifyDate(data.saleDate)}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="invoice-desc">
                  {/* <h3 className="title">SALE</h3> */}
                  <ul className="list-plain" style={{marginTop: "60px"}}>
                    
                      <li>
                        <span>Gender</span>:<span>{data.gender}</span>
                      </li>
                      <li>
                        <span>Age</span>:<span>{data.age}</span>
                      </li>
                  </ul>
                </div>
              </div>

              <h5 className="title">Products</h5>
              <div className="invoice-bills">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Time</th>
                        <th>Product</th>
                        <th>Status</th>
                        <th>Slot</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productData.map((obj, k) => {
                        return (
                          <tr key={k}>
                            <td>{beautifyDate(obj.transactionDateTime)}</td>
                            <td>{obj.productCode}: {obj.name}</td>
                            <td>{obj.dispenseStatus}</td>
                            <td>{obj.slotId}</td>
                            <td>{obj.productPrice}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="3"></td>
                        <td colSpan="1">Purchase Amount</td>
                        <td>{data.purchaseAmount}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              <h5 className="title">Payments</h5>
              <div className="invoice-bills">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Time</th>
                        <th>Method</th>
                        <th>Direction</th>
                        <th>Info</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentData.map((obj, k) => {
                        return (
                          <tr key={k}>
                            <td>{beautifyDate(obj.readDateTime)}</td>
                            <td>{obj.paymentMethod}</td>
                            <td>{obj.paymentDirection}</td>
                            <td>{obj.paymentInfo}</td>
                            <td>{obj.transactionAmount}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="3"></td>
                        <td colSpan="1">Paid Amount</td>
                        <td>{data.paidAmount}</td>
                      </tr>
                      <tr>
                        <td colSpan="3"></td>
                        <td colSpan="1">Purchase Amount</td>
                        <td>{data.purchaseAmount}</td>
                      </tr>
                      <tr>
                        <td colSpan="3"></td>
                        <td colSpan="1">Balance</td>
                        <td>{data.balanceAmount}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default Show;

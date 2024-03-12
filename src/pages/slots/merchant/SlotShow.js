import React, { useState, useEffect } from "react";
import { Icon, Row, Col, Block, PreviewCard, RemotePaginationTable, DateRange } from "src/components/Component";
// import { Badge } from "reactstrap";
import { Nav, NavItem, TabContent, TabPane, Modal, ModalBody, NavLink } from "reactstrap";
import classnames from "classnames";

import { beautifyDate } from "src/utils/Utils";

import { variables } from "./SlotVariables";
import api from "src/api";

const Show = ({ products, ...props }) => {
  const [activeTab, setActiveTab] = useState("1");
  const [refillData, setRefillData] = useState([]);
  const [productTransactionData, setProductTransactionData] = useState([]);

  const [refillLoading, setRefillLoading] = useState(false);
  const [refillTotalCount, setRefillTotalCount] = useState(0);
  const [refillPageSize, setRefillPageSize] = useState(10);
  const [refillPageNumber, setRefillPageNumber] = useState(1);
  const [refillProductCode, setRefillProductCode] = useState("");
  const [refillRangeDate, setRefillRangeDate] = useState({
    start: null,
    end: null,
  });

  const [productLoading, setProductLoading] = useState(false);
  const [productTotalCount, setProductTotalCount] = useState(0);
  const [productPageSize, setProductPageSize] = useState(10);
  const [productPageNumber, setProductPageNumber] = useState(1);
  const [productProductCode, setProductProductCode] = useState("");
  const [productStatus, setProductStatus] = useState("");
  const [productRangeDate, setProductRangeDate] = useState({
    start: null,
    end: null,
  });
  

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const refill_columns = [
    {
      name: "Product Code",
      selector: (row) => row.productCode,
    },
    {
      name: "Refill Quantity",
      selector: (row) => row.refillQuantity,
    },

    {
      name: "Date Time",
      selector: (row) => beautifyDate(row.refillDatetime),
    },
  ];

  const transaction_columns = [
    {
      name: "Sale No",
      selector: (row) => row.saleNo,
    },
    {
      name: "Product Code",
      selector: (row) => row.productCode,
    },

    {
      name: "Product Price",
      selector: (row) => row.productPrice,
    },
    {
      name: "Dispensed",
      selector: (row) => row.dispensed,
    },
    {
      name: "Date Time",
      selector: (row) => beautifyDate(row.transactionDateTime),
    },
  ];

  useEffect(() => {
    setRefillLoading(true);
    api
      .get("/ProductSlot/GetSlotRefillTransaction" + props.formData["slotId"], {
        params: {
          PageSize: refillPageSize,
          PageNumber: refillPageNumber,
          FromDate: refillRangeDate.start,
          ToDate: refillRangeDate.end,
          ProductCode: refillProductCode,
        },
      })
      .then((res) => {
        setRefillTotalCount(res.data.totalCount);
        setRefillData(res.data.items);
        setRefillLoading(false);
      });
  }, [props.formData, refillPageSize, refillPageNumber, refillRangeDate, refillProductCode]);

  useEffect(() => {
    setProductLoading(true);
    api
      .get("/ProductSlot/GetSlotProductTransaction" + props.formData["slotId"], {
        params: {
          PageSize: productPageSize,
          PageNumber: productPageNumber,
          FromDate: productRangeDate.start,
          ToDate: productRangeDate.end,
          ProductCode: productProductCode,
          Status: productStatus
        },
      })
      .then((res) => {
        setProductTotalCount(res.data.totalCount);
        setProductTransactionData(res.data.items);
        setProductLoading(false);
      });
  }, [props.formData, productPageSize, productPageNumber, productRangeDate, productProductCode, productStatus]);

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
          <Nav tabs>
            <NavItem>
              <NavLink
                tag="a"
                href="#tab"
                className={classnames({ active: activeTab === "1" })}
                onClick={(ev) => {
                  ev.preventDefault();
                  toggle("1");
                }}
              >
                Information
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag="a"
                href="#tab"
                className={classnames({ active: activeTab === "2" })}
                onClick={(ev) => {
                  ev.preventDefault();
                  toggle("2");
                }}
              >
                Refill Transactions
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag="a"
                href="#tab"
                className={classnames({ active: activeTab === "3" })}
                onClick={(ev) => {
                  ev.preventDefault();
                  toggle("3");
                }}
              >
                Product Transactions
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Block size="lg">
                <Row className="gy-3">
                  <Col lg={6}>
                    <span className="sub-text">Slot No</span>
                    <span className="caption-text">{props.formData.slotNo}</span>
                  </Col>
                  <Col lg={6}>
                    <span className="sub-text">Machine Code</span>
                    <span className="caption-text">{props.formData.machineCode}</span>
                  </Col>
                  <Col lg={6}>
                    <span className="sub-text">Product</span>
                    {props.formData.productName && (
                      <span className="caption-text">
                        {props.formData.productCode} - {props.formData.productName}
                      </span>
                    )}
                  </Col>
                  <Col lg={6}>
                    <span className="sub-text">Capacity</span>
                    <span className="caption-text">{props.formData.capacity}</span>
                  </Col>
                  <Col lg={6}>
                    <span className="sub-text">Sale Price</span>
                    <span className="caption-text">{props.formData.salePrice}</span>
                  </Col>
                  <Col lg={6}>
                    <span className="sub-text">Current Count</span>
                    <span className="caption-text">
                      {props.formData.totalRefillCount - props.formData.totalProducttransactionCount}
                    </span>
                  </Col>
                  <Col lg={6}>
                    <span className="sub-text">{variables.name} Description</span>
                    <span className="caption-text"> {props.formData.description}</span>
                  </Col>
                </Row>
              </Block>
            </TabPane>
            <TabPane tabId="2">
              <Row className="g-3">
                <Col size="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="productId">
                      Filter by Product
                    </label>
                    <div className="form-control-wrap">
                      <div className="form-control-select">
                        <select
                          // ref={props.register()}
                          className="form-control form-select"
                          id="productId"
                          name="productId"
                          placeholder="Select an option"
                          onChange={(e) => setRefillProductCode(e.target.value)}
                        >
                          <option label="Select Product" value=""></option>
                          {products.map((product, key) => {
                            return (
                              <option value={product.productCode} key={key}>
                                {product.productCode + ": " + product.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col size="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="date-range">
                      Select Date Range
                    </label>
                    <div className="form-control-wrap">
                      
                      <DateRange rangeDate={refillRangeDate} setRangeDate={setRefillRangeDate} />
                      {" "}
                    </div>
                  </div>
                </Col>

                <br />
              </Row>
              <Block size="lg">
                <PreviewCard>
                  <RemotePaginationTable
                    totalCount={refillTotalCount}
                    setRowsPerPageServer={setRefillPageSize}
                    pageNumber={refillPageNumber}
                    setPageNumber={setRefillPageNumber}
                    loading={refillLoading}
                    data={refillData}
                    columns={refill_columns}
                    searchableColumns={["productCode", "refillQuantity", "refillDatetime"]}
                    pagination
                    actions={false}
                  />
                </PreviewCard>
              </Block>
            </TabPane>
            <TabPane tabId="3">
              <Block size="lg">
                <Row className="g-3">
                  <Col size="4">
                    <div className="form-group">
                      <label className="form-label" htmlFor="productId">
                        Filter by Product
                      </label>
                      <div className="form-control-wrap">
                        <div className="form-control-select">
                          <select
                            // ref={props.register()}
                            className="form-control form-select"
                            id="productId"
                            name="productId"
                            placeholder="Select an option"
                            onChange={(e) => setProductProductCode(e.target.value)}
                          >
                            <option label="Select Product" value=""></option>
                            {products.map((product, key) => {
                              return (
                                <option value={product.productCode} key={key}>
                                  {product.productCode + ": " + product.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col size="4">
                    <div className="form-group">
                      <label className="form-label" htmlFor="status">
                        Filter by Status
                      </label>
                      <div className="form-control-wrap">
                        <div className="form-control-select">
                          <select
                            // ref={props.register()}
                            className="form-control form-select"
                            id="status"
                            name="status"
                            placeholder="Select an option"
                            onChange={(e) => setProductStatus(e.target.value)}
                          >
                            <option label="Select Status" value=""></option>
                            <option value="active">ACTIVE</option>
                            <option value="inactive">INACTIVE</option>
                            
                          </select>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col size="4">
                    <div className="form-group">
                      <label className="form-label" htmlFor="date-range">
                        Select Date Range
                      </label>
                      <div className="form-control-wrap">
                        
                        <DateRange rangeDate={productRangeDate} setRangeDate={setProductRangeDate}/>
                        {" "}
                      </div>
                      
                    </div>
                  </Col>

                  <br />
                </Row>
                <PreviewCard>
                  <RemotePaginationTable
                    totalCount={productTotalCount}
                    setRowsPerPageServer={setProductPageSize}
                    pageNumber={productPageNumber}
                    setPageNumber={setProductPageNumber}
                    loading={productLoading}
                    data={productTransactionData}
                    columns={transaction_columns}
                    searchableColumns={["saleNo", "productCode", "productPrice", "dispensed", "transactionDateTime"]}
                    pagination
                    actions={false}
                  />
                </PreviewCard>
              </Block>
            </TabPane>
          </TabContent>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default Show;

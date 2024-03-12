import React, { useState } from "react";

import { BlockDes, Icon, Row, Col, Button, PrettyTable, UserAvatar } from "src/components/Component";

import { ModalBody, Modal } from "reactstrap";

// import { categoryOptions } from "./ProductData";

import { findUpper, readImg, NoImage } from "src/utils/Utils";
import { variables } from "./ProductVariables";
// import { RSelect } from "src/components/Component";

const Add = (props) => {
  const [searchText, setSearchText] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [idField, setIdField] = useState({})

  const dataTableColumns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => (
        <a
          href="#title"
          onClick={(ev) => {
            ev.preventDefault();
          }}
          className="project-title"
        >
          <UserAvatar
            width="40px"
            height="40px"
            className="sq"
            theme="primary"
            text={findUpper(row.name)}
            image={row.productImage ? readImg(row.productImage) : NoImage}
          />
          <div className="project-info">
            <h6 className="title">{row.name}</h6>
          </div>
        </a>
      ),
    },
    {
      name: "Code",
      selector: (row) => row.productCode,
      sortable: true,
    },
    {
      name: "Bar Code",
      selector: (row) => row.productBarCode,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Display Name",
      selector: (row) => row[variables.id],
      cell: (row) => (
        <div className="form-control-wrap">
          <div className="input-group">
              <input id={row["productCode"]} type="text" style={{width:"50px"}} className="form-control" onChange={updateProductField}/>
          </div>
        </div> 
      )
    },
  ];

  const updateProductField = (e) => {
    idField[e.target.id] = e.target.value
    setIdField({
      ...idField
    })
  }

  const addItems = () => {
    let newProducts = []
    for (let product of selectedProducts){
      if (product["productCode"] in idField){
        product['newDescription'] = idField[product["productCode"]]
      }
      else{
        product['newDescription'] = ""
      }
      newProducts.push(product)
    }
    setSelectedProducts(newProducts)

    props.addProducts(selectedProducts)
  };

  return (
    <Modal isOpen={props.view.add} toggle={() => props.onFormCancel()} className="modal-dialog-centered" size="lg">
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
          <h5 className="title">Add {variables.name}</h5>
          <BlockDes>
            <p>Add information or update {variables.name}.</p>
          </BlockDes>
          <div className="mt-4">
            <Row className="g-3">
              <Col size="12">
                <div className="form-control-wrap">
                  <div className="form-icon form-icon-right">
                    <Icon name="search"></Icon>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="default-04"
                    placeholder="Search Products ..."
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>
              </Col>
              <Col size="12">
                <PrettyTable
                  height="300px"
                  setCheckedItems={setSelectedProducts}
                  data={props.productCatalog}
                  columns={dataTableColumns}
                  selectable={true}
                  searchText={searchText}
                  primaryKey="productCode"
                  searchableColumns={["name", "productCode", "productBarCode", "category"]}
                />
              </Col>

              <Col size="12" style={{ textAlign: "right" }}>
                <Button color="primary" loading={props.uploading} onClick={addItems}>
                  <Icon className="plus"></Icon>
                  <span>Add {variables.name}</span>
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default Add;

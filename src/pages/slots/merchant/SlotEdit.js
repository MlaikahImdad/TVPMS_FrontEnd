import React, { useState, useEffect } from "react";

import { Icon, Row, Col, Button } from "src/components/Component";

import { Modal, ModalBody } from "reactstrap";
import { readImg } from "src/utils/Utils";
import { variables } from "./SlotVariables";
import { RSelect } from "src/components/Component";

const Update = (props) => {
  const [productOptions, setProductOptions] = useState([]);

  useEffect(() => {
    let options = [];
    for (let item of props.products) {
      options.push({
        value: item.id,
        filterLabel: item.name,
        label: (
          <div>
            <img
              src={readImg(item.productImage)}
              style={{ width: "30px", height: "30px", marginRight: "10px" }}
              alt=""
            />
            {item.name}{" "}
          </div>
        ),
      });
    }
    setProductOptions(options);
  }, [props.products]);

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
            <form noValidate onSubmit={props.handleSubmit(props.onEditSubmit)}>
              <Row className="g-3">
                <Col size="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="capacity">
                      {variables.name} Capacity
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name="capacity"
                        onChange={(e) => props.onInputChange(e)}
                        ref={props.register({
                          required: "This field is required",
                          valueAsNumber: true,
                          pattern: {
                            value: /^(0|[1-9]\d*)(\.\d+)?$/,
                            message: "Input must be a number",
                          },
                        })}
                        defaultValue={props.formData.capacity}
                      />
                      {props.errors.capacity && <span className="invalid">{props.errors.capacity.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="salePrice">
                      Sale Price
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name="salePrice"
                        ref={props.register({
                          required: "This field is required",
                          valueAsNumber: true,
                          pattern: {
                            value: /^(0|[1-9]\d*)(\.\d+)?$/,
                            message: "Input must be a number",
                          },
                        })}
                        defaultValue={props.formData.salePrice}
                      />
                      {props.errors.salePrice && <span className="invalid">{props.errors.salePrice.message}</span>}
                    </div>
                  </div>
                </Col>

                <Col size="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="productId">
                      Select Product
                    </label>
                    <div className="form-control-wrap">
                      <div className="form-control-select">
                        
                        <RSelect
                          options={productOptions}
                          filterOption={(option, inputVal) => {
                            let filterLabel = option.data.filterLabel;
                            return filterLabel.toLowerCase().includes(inputVal.toLowerCase());
                          }}
                          name="productCode"
                          ref={props.register({required:"This is required"})}
                          
                        />
                      </div>
                    </div>
                  </div>
                </Col>

                <Col size="12">
                  <Button color="primary" type="submit" loading={props.uploading}>
                    <Icon className="plus"></Icon>
                    <span>Update {variables.name}</span>
                  </Button>
                </Col>
              </Row>
            </form>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default Update;

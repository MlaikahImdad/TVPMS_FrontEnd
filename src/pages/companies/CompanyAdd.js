import React from "react";

import {
  Block,
  BlockHead,
  BlockTitle,
  BlockHeadContent,
  BlockDes,
  Icon,
  Row,
  Col,
  Button,
} from "src/components/Component";

import SimpleBar from "simplebar-react";
import { variables } from "./CompanyVariables";

const Add = (props) => {
  return (
    <SimpleBar
      className={`nk-add-product toggle-slide toggle-slide-right toggle-screen-any ${
        props.view.add ? "content-active" : ""
      }`}
    >
      <BlockHead>
        <BlockHeadContent>
          <BlockTitle tag="h5">Add {variables.name}</BlockTitle>
          <BlockDes>
            <p>Add information or update {variables.name}.</p>
          </BlockDes>
        </BlockHeadContent>
      </BlockHead>
      <Block>
        <form onSubmit={props.handleSubmit(props.onFormSubmit)}>
          <Row className="g-3">
            <Col size="6">
              <div className="form-group">
                <label className="form-label" htmlFor="product-name">
                  {variables.name} Name
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={(e) => props.onInputChange(e)}
                    ref={props.register({
                      required: "This field is required",
                    })}
                    defaultValue={props.formData.name}
                  />
                  {props.errors.name && <span className="invalid">{props.errors.name.message}</span>}
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="form-group">
                <label className="form-label" htmlFor="websiteUrl">
                  Website
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    name="websiteUrl"
                    ref={props.register({
                      pattern: {
                        value: /^(https?:\/\/)?[^\s/$.?#].[^\s]*$/i,
                        message: "Invalid Website URL",
                      },
                    })}
                    placeholder="http://example.com"
                    onChange={(e) => props.onInputChange(e)}
                    className="form-control"
                    defaultValue={props.formData.websiteUrl}
                  />
                  {props.errors.websiteUrl && <span className="invalid">{props.errors.websiteUrl.message}</span>}
                </div>
              </div>
            </Col>

            <Col md="6">
              <div className="form-group">
                <label className="form-label" htmlFor="focalPersonDetaills">
                  Focal Person
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    name="focalPersonDetaills"
                    ref={props.register()}
                    onChange={(e) => props.onInputChange(e)}
                    className="form-control"
                    defaultValue={props.formData.focalPersonDetaills}
                  />
                  {props.errors.focalPersonDetaills && (
                    <span className="invalid">{props.errors.focalPersonDetaills.message}</span>
                  )}
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="form-group">
                <label className="form-label" htmlFor="phoneNumber">
                  Phone Number
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    className="form-control"
                    name="phoneNumber"
                    onChange={(e) => props.onInputChange(e)}
                    ref={props.register({
                      pattern: {
                        value: /^(?:\+92|0)?\d{10}$/i,
                        message: "Invalid Phone Number",
                      },
                    })}
                    placeholder="03XXXXXXXXX"
                    defaultValue={props.formData.phoneNumber}
                  />
                  {props.errors.phoneNumber && <span className="invalid">{props.errors.phoneNumber.message}</span>}
                </div>
              </div>
            </Col>

            <Col md="6">
              <div className="form-group">
                <label className="form-label" htmlFor="address">
                  Address
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    onChange={(e) => props.onInputChange(e)}
                    ref={props.register()}
                    defaultValue={props.formData.address}
                  />
                  {props.errors.address && <span className="invalid">{props.errors.address.message}</span>}
                </div>
              </div>
            </Col>

            <Col md="6">
              <div className="form-group">
                <label className="form-label" htmlFor="location">
                  Location Coordinates
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    className="form-control"
                    name="location"
                    onChange={(e) => props.onInputChange(e)}
                    ref={props.register({
                      pattern: {
                        value: /^-?\d{1,3}\.\d+,\s*-?\d{1,3}\.\d+$/i,
                        message: "Invalid Coordinates",
                      },
                    })}
                    defaultValue={props.formData.location}
                    placeholder="51.5074, -0.1278"
                  />
                  {props.errors.location && <span className="invalid">{props.errors.location.message}</span>}
                </div>
              </div>
            </Col>


            <Col size="12">
              <div className="form-group">
                <label className="form-label" htmlFor="otherInformation">
                  Description
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    className="form-control"
                    name="otherInformation"
                    onChange={(e) => props.onInputChange(e)}
                    ref={props.register()}
                    defaultValue={props.formData.otherInformation}
                  />
                  {props.errors.otherInformation && (
                    <span className="invalid">{props.errors.otherInformation.message}</span>
                  )}
                </div>
              </div>
            </Col>

            <Col size="12">
              <Button color="primary" loading={props.uploading} type="submit">
                <Icon className="plus"></Icon>
                <span>Add {variables.name}</span>
              </Button>
            </Col>
          </Row>
        </form>
      </Block>
    </SimpleBar>
  );
};

export default Add;

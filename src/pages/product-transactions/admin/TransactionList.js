import React, { useState, useEffect } from "react";
import Head from "src/layout/head/Head";
import Content from "src/layout/content/Content";
import {
  Block,
  BlockHead,
  BlockTitle,
  BlockBetween,
  BlockHeadContent,
  Icon,
  PreviewCard,
  Row,
  Col,
  RemotePaginationTable,
  DateRange,
} from "src/components/Component";
import "./style.css";

import { UncontrolledDropdown, DropdownToggle } from "reactstrap";

import api from "src/api";
import { useForm } from "react-hook-form";
import { showAlert, getPlural } from "src/utils/Utils";
import Update from "./TransactionEdit";
import Add from "./TransactionAdd";
import ShowPage from "./TransactionShow";

import { variables } from "./TransactionVariables";

const List = () => {
  const [data, setData] = useState([]);
  const { errors, register, handleSubmit, reset } = useForm();

  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState(variables.create);
  const [editId, setEditedId] = useState();
  const [loading, setLoading] = useState(true);
  const [dropzoneError, setDropzoneError] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [rangeDate, setRangeDate] = useState({
    start: null,
    end: null,
  });

  const [companies, setCompanies] = useState([]);
  const [chosenCompany, setChosenCompany] = useState(null);

  const [machines, setMachines] = useState([]);
  const [chosenMachine, setChosenMachine] = useState(null);

  const [products, setProducts] = useState([])
  const [chosenProduct, setChosenProduct] = useState(null);

  const [chosenStatus, setChosenStatus] = useState(null);

  const dataTableColumns = [
    ...variables.columns,
    {
      name: "Actions",
      selector: (row) => row[variables.id],
      style: { textAlign: "right" },
      cell: (row) => (
        <div>
          <div className="tb-odr-btns d-none d-md-inline">
            <UncontrolledDropdown>
              <DropdownToggle
                tag="a"
                className="dropdown-toggle btn btn-icon btn-trigger"
                onClick={(ev) => {
                  console.log(row)
                  ev.preventDefault();
                  onEditClick(row[variables.id]);
                  toggle("details");
                }}
              >
                <Icon name="eye" style={{ fontSize: "20px", cursor: "pointer" }}></Icon>
              </DropdownToggle>
            </UncontrolledDropdown>
          </div>
        </div>
      ),
    },
  ];

  const [view, setView] = useState({
    edit: false,
    add: false,
    details: false,
  });

  useEffect(() => {
    setLoading(true);
    api.get(variables.api.products).then(res => {
      setProducts(res.data)      
    })
    setLoading(false)
  }, [])

  useEffect(() => {
    setLoading(true);
    api.get(variables.api.companies).then(res => {
      setCompanies(res.data)
    })
    setLoading(false)
  }, [])

  useEffect(() => {
    setLoading(true);
    api.get(variables.api.machines).then((res) => {
      setMachines(res.data);
      // if (res.data.length > 0 && chosenMachine == null) {
      //   setChosenMachine(res.data[0].id);
      // }
      
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    let params_obj = {
      CompanyId: chosenCompany,
      Status: chosenStatus,
      ProductCode: chosenProduct,
      Machineid: chosenMachine,
      PageSize: pageSize,
      PageNumber: pageNumber,
      FromDate: rangeDate.start,
      ToDate: rangeDate.end,
    }

    let non_emp_params = Object.entries(params_obj)
    .filter(([key, value]) => value !== '')
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
    api
      .get(variables.api.index, {
        params: non_emp_params
      })
      .then((res) => {
        setTotalCount(res.data.totalCount);
        setData(res.data.items);
        setLoading(false);
      });
  }, [chosenCompany,chosenStatus,chosenProduct,chosenMachine, pageSize, pageNumber, rangeDate]);

  // OnChange function to get the input data
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // category change
  const onCategoryChange = (value) => {
    setFormData({ ...formData, category: value });
  };

  // function to close the form modal
  const onFormCancel = () => {
    setView({ edit: false, add: false, details: false });
    resetForm();
  };

  const resetForm = () => {
    setFormData(variables.create);
    reset({});
    setDropzoneError(false);
  };

  const getFormData = (form, id = null) => {
    let submittedData = {};
    for (let key in variables.create) {
      submittedData[key] = form[key];
    }
    if (id) {
      submittedData[variables.id] = id;
    }
    let fd = new FormData();
    for (let key in submittedData) {
      fd.append(key, submittedData[key]);
    }
    if (files.length > 0) {
      fd.append("productImage", files[0]);
    }
    return fd;
  };

  const onFormSubmit = (form) => {
    if (files.length > 0) {
      setUploading(true);

      api
        .post(variables.api.create, getFormData(form))
        .then((res) => {
          api.get(variables.api.index).then((res) => {
            resetForm();
            setUploading(false);
            setData(res.data);

            setView({ open: false });
            setFiles([]);
            showAlert("success", variables.name + " Successfully Saved.");
          });
        })
        .catch((error) => {
          setUploading(false);
          showAlert("error", `Error: ${error.response.statusText}`);
        });
    } else {
      setDropzoneError(true);
    }
  };

  const onEditClick = (id) => {
    data.forEach((item) => {
      if (item[variables.id] === id) {
        let temp = {};
        for (let key in variables.create) {
          temp[key] = item[key];
        }
        temp[variables.id] = item[variables.id];
        setFormData(temp);
      }
    });

    setEditedId(id);
    setFiles([]);
    setView({ add: false, edit: true });
  };

  const onEditSubmit = (form) => {
    setUploading(true);

    api
      .put(variables.api.update, getFormData(form, editId))
      .then((res) => {
        // console.log(res.data)
        api.get(variables.api.show.replace("{id}", editId)).then((res_s) => {
          // console.log(res_s.data)
          let newItems = data;
          let index = newItems.findIndex((item) => item[variables.id] === editId);
          newItems[index] = res_s.data;
          setData([]);
          setData(newItems);
          resetForm();
          setUploading(false);
          setView({ edit: false, add: false });

          showAlert("success", `${variables.name}: "${res_s.data.name}" Successfully Updated.`);
        });
      })
      .catch((error) => {
        setUploading(false);
        showAlert("error", `Error: ${error.response.statusText}`);
      });
  };

  // toggle function to view product details
  const toggle = (type) => {
    setView({
      edit: type === "edit" ? true : false,
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
    });
  };

  // handles ondrop function of dropzone
  const handleDropChange = (acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  return (
    <React.Fragment>
      <Head title={variables.name + " List"}></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle>{getPlural(variables.name)}</BlockTitle>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Row className="g-3">
          <Col size="4">
            <div className="form-group">
              <label className="form-label" htmlFor="companyId">
                Filter by Company
              </label>
              <div className="form-control-wrap">
                <div className="form-control-select">
                  <select
                    className="form-control form-select"
                    id="companyId"
                    name="companyId"
                    placeholder="Select an option"
                    onChange={(e) => setChosenCompany(e.target.value)}
                    // defaultValue={props.formData.roleId}
                  >
                    <option label="Select Company" value=""></option>

                    {companies.map((company, key) => {
                      return (
                        <option value={company.companyId} key={key}>
                          {company.name}
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
              <label className="form-label" htmlFor="machineId">
                Filter by Machine
              </label>
              <div className="form-control-wrap">
                <div className="form-control-select">
                  <select
                    className="form-control form-select"
                    id="machineId"
                    name="machineId"
                    placeholder="Select an option"
                    onChange={(e) => setChosenMachine(e.target.value)}
                    // defaultValue={props.formData.roleId}
                  >
                    <option label="Select Machine" value=""></option>

                    {machines.map((machine, key) => {
                      return (
                        <option value={machine.id} key={key}>
                          {machine.machineCode + ": " + machine.machineName}
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
              <label className="form-label" htmlFor="ProductCode">
                Filter by Product Code
              </label>
              <div className="form-control-wrap">
                <div className="form-control-select">
                  <select
                    className="form-control form-select"
                    id="ProductCode"
                    name="Product Code"
                    placeholder="Select an option"
                    onChange={(e) => setChosenProduct(e.target.value)}
                    // defaultValue={props.formData.roleId}
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
          
        </Row>
        <br/>
        <Row className="g-3">
          
          
          <Col size="4">
            <div className="form-group">
              <label className="form-label" htmlFor="transactionStatus">
                Filter by Status
              </label>
              <div className="form-control-wrap">
                <div className="form-control-select">
                  <select
                    className="form-control form-select"
                    id="transactionStatus"
                    name="transactionStatus"
                    placeholder="Select an option"
                    onChange={(e) => setChosenStatus(e.target.value)}
                    // defaultValue={props.formData.roleId}
                  >
                    <option label="Select Status" value=""></option>
                    <option label="Success" value="Success"></option>
                    <option label="Fail" value="Fail"></option>
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
                <DateRange rangeDate={rangeDate} setRangeDate={setRangeDate} />{" "}
              </div>
            </div>
          </Col>
        </Row>

        <br />

        <Block size="lg">
          <PreviewCard>
            <RemotePaginationTable
              totalCount={totalCount}
              setRowsPerPageServer={setPageSize}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              loading={loading}
              data={data}
              columns={dataTableColumns}
              searchableColumns={variables.searchableColumns}
              pagination
              actions={variables.actions}
            />
          </PreviewCard>
        </Block>

        <Update
          view={view}
          uploading={uploading}
          onFormCancel={onFormCancel}
          handleSubmit={handleSubmit}
          onInputChange={onInputChange}
          register={register}
          formData={formData}
          errors={errors}
          onEditSubmit={onEditSubmit}
          onCategoryChange={onCategoryChange}
          handleDropChange={handleDropChange}
          files={files}
        />

        {/* <Show view={view} onFormCancel={onFormCancel} formData={formData} /> */}
        <ShowPage view={view} onFormCancel={onFormCancel} formData={formData} />
        <Add
          view={view}
          uploading={uploading}
          dropzoneError={dropzoneError}
          handleSubmit={handleSubmit}
          onFormCancel={onFormCancel}
          onFormSubmit={onFormSubmit}
          onInputChange={onInputChange}
          register={register}
          formData={formData}
          errors={errors}
          onCategoryChange={onCategoryChange}
          handleDropChange={handleDropChange}
          files={files}
        />

        {view.add && <div className="toggle-overlay" onClick={toggle}></div>}
      </Content>
    </React.Fragment>
  );
};

export default List;

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import exportFromJSON from "export-from-json";
import CopyToClipboard from "react-copy-to-clipboard";
import { Col, Modal, ModalBody, Row, Button } from "reactstrap";
import "./ReactDataTable.css";

import { DataTablePagination } from "../Component";

const Export = ({ data }) => {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (modal === true) {
      setTimeout(() => setModal(false), 2000);
    }
  }, [modal]);

  const fileName = "user-data";

  const exportCSV = () => {
    const exportType = exportFromJSON.types.csv;
    exportFromJSON({ data, fileName, exportType });
  };

  const exportExcel = () => {
    const exportType = exportFromJSON.types.xls;
    exportFromJSON({ data, fileName, exportType });
  };

  const copyToClipboard = () => {
    setModal(true);
  };

  return (
    <React.Fragment>
      <div className="dt-export-buttons d-flex align-center">
        <div className="dt-export-title d-none d-md-inline-block">Export</div>
        <div className="dt-buttons btn-group flex-wrap">
          <CopyToClipboard text={JSON.stringify(data)}>
            <Button className="buttons-copy buttons-html5" onClick={() => copyToClipboard()}>
              <span>Copy</span>
            </Button>
          </CopyToClipboard>{" "}
          <button className="btn btn-secondary buttons-csv buttons-html5" type="button" onClick={() => exportCSV()}>
            <span>CSV</span>
          </button>{" "}
          <button className="btn btn-secondary buttons-excel buttons-html5" type="button" onClick={() => exportExcel()}>
            <span>Excel</span>
          </button>{" "}
        </div>
      </div>
      <Modal isOpen={modal} className="modal-dialog-centered text-center" size="sm">
        <ModalBody className="text-center m-2">
          <h5>Copied to clipboard</h5>
        </ModalBody>
        <div className="p-3 bg-light">
          <div className="text-center">Copied {data.length} rows to clipboard</div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

const ExpandableRowComponent = ({ data }) => {
  return (
    <ul className="dtr-details p-2 border-bottom ms-1">
      <li className="d-block d-sm-none">
        <span className="dtr-title">Company</span> <span className="dtr-data">{data.company}</span>
      </li>
      <li className="d-block d-sm-none">
        <span className="dtr-title ">Gender</span> <span className="dtr-data">{data.gender}</span>
      </li>
      <li>
        <span className="dtr-title">Start Date</span> <span className="dtr-data">{data.startDate}</span>
      </li>
      <li>
        <span className="dtr-title">Salary</span> <span className="dtr-data">{data.salary}</span>
      </li>
    </ul>
  );
};

const CustomCheckbox = React.forwardRef(({ onClick, ...rest }, ref) => (
  <div className="custom-control custom-control-sm custom-checkbox notext">
    <input id={rest.name} type="checkbox" className="custom-control-input" ref={ref} onClick={onClick} {...rest} />
    <label className="custom-control-label" htmlFor={rest.name} />
  </div>
));

const ReactDataTable = ({
  data,
  columns,
  loading,
  pagination,
  actions,
  className,
  selectableRows,
  expandableRows,
  searchableColumns,
  filterText,
  filterCol,
  conditionalRowStyles,
  totalCount,
  setRowsPerPageServer,
  setPageNumber,
  pageNumber
}) => {
  const [tableData, setTableData] = useState(data);
  const [searchText, setSearchText] = useState("");
  const [rowsPerPageS, setRowsPerPage] = useState(10);
  const [mobileView, setMobileView] = useState();
  const [height, setHeight] = useState("300px");

  useEffect(() => {
    let wrap = document.querySelector(".nk-wrap");
    let header = document.querySelector(".nk-header");
    // let content = document.querySelector('.nk-content')
    let footer = document.querySelector(".nk-footer");

    let dataTable = document.querySelector(".dataTables_wrapper");

    // let extraHeight = wrap.scrollHeight - (header.scrollHeight + footer.scrollHeight + content.scrollHeight)
    let extraHeight = wrap.scrollHeight - (header.scrollHeight + footer.scrollHeight + 300);
    setHeight(dataTable.scrollHeight + extraHeight + "px");
    // console.log("Extra Height",extraHeight, "DataTable Height", dataTable.scrollHeight)
  }, []);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const searchRows = (searchText, searchableColumns, data) => {
    let defaultData = data.filter((item) => {
      let result = null;
      for (let col of searchableColumns) {
        if (result) {
          result = result || item[col].toLowerCase().includes(searchText.toLowerCase());
        } else {
          result = item[col].toLowerCase().includes(searchText.toLowerCase());
        }
      }
      return result;
      // return item.name.toLowerCase().includes(searchText.toLowerCase());
    });
    return defaultData;
  };

  useEffect(() => {
    let defaultData;
    if (searchText !== "") {
      defaultData = searchRows(searchText, searchableColumns, data);
      setTableData(defaultData);
    } else {
      setTableData(data);
    }
  }, [data, searchText, searchableColumns]);

  useEffect(() => {
    if (filterText && filterCol) {
      let defaultData;
      defaultData = searchRows(filterText, [filterCol], data);
      setTableData(defaultData);
    }
  }, [data, filterText, filterCol]);

  // function to change the design view under 1200 px
  const viewChange = () => {
    if (window.innerWidth < 960 && expandableRows) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  };

  useEffect(() => {
    window.addEventListener("load", viewChange);
    window.addEventListener("resize", viewChange);
    return () => {
      window.removeEventListener("resize", viewChange);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`dataTables_wrapper dt-bootstrap4 no-footer ${className ? className : ""}`}>
      <Row className={`justify-between g-2 ${actions ? "with-export" : ""}`}>
        <Col className="col-7 text-start" sm="4">
          <div id="DataTables_Table_0_filter" className="dataTables_filter">
            <label>
              <input
                type="search"
                className="form-control form-control-sm"
                placeholder="Search by typing"
                onChange={(ev) => setSearchText(ev.target.value)}
              />
            </label>
          </div>
        </Col>
        <Col className="col-5 text-end" sm="8">
          <div className="datatable-filter">
            <div className="d-flex justify-content-end g-2">
              {actions && <Export data={data} />}
              <div className="dataTables_length" id="DataTables_Table_0_length">
                <label>
                  <span className="d-none d-sm-inline-block">Show</span>
                  <div className="form-control-select">
                    {" "}
                    <select
                      name="DataTables_Table_0_length"
                      className="custom-select custom-select-sm form-control form-control-sm"
                      onChange={(e) => {
                        setRowsPerPage(e.target.value);
                        setRowsPerPageServer(e.target.value);
                      }}
                      value={rowsPerPageS}
                    >
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                      <option value="1000">1000</option>
                      <option value="5000">5000</option>
                      <option value="10000">10000</option>
                    </select>{" "}
                  </div>
                </label>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <DataTable
        fixedHeader={true}
        fixedHeaderScrollHeight={height}
        data={tableData}
        columns={columns}
        className={className}
        selectableRows={selectableRows}
        selectableRowsComponent={CustomCheckbox}
        expandableRowsComponent={ExpandableRowComponent}
        expandableRows={mobileView}
        noDataComponent={<div className="p-2">There are no records found</div>}
        progressPending={loading}
        sortIcon={
          <div>
            <span>&darr;</span>
            <span>&uarr;</span>
          </div>
        }
        pagination={pagination}

        conditionalRowStyles={conditionalRowStyles}

        paginationComponent={({onChangeRowsPerPage }) => {

          return (
            <DataTablePagination
              customItemPerPage={rowsPerPageS}
              itemPerPage={rowsPerPageS}
              totalItems={totalCount}
              paginate={(page) => setPageNumber(page)}
              currentPage={pageNumber}
              onChangeRowsPerPage={onChangeRowsPerPage}
              setRowsPerPage={setRowsPerPage}
            />
          )
        }}
      ></DataTable>
    </div>
  );
};

export default ReactDataTable;

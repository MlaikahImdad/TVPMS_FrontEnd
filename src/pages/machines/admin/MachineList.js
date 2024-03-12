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
  Button,
  PreviewCard,
  ReactDataTable,
} from "src/components/Component";

import { DropdownItem, UncontrolledDropdown, DropdownMenu, DropdownToggle } from "reactstrap";

// import {DropdownItem, UncontrolledDropdown, DropdownMenu, DropdownToggle } from "reactstrap";
// import { productData } from "./ProductData";
import api from "src/api";
import { showAlert, deleteConfirmation, getPlural } from "src/utils/Utils";
import Update from "./MachineEdit";
import Show from "./MachineShow";
import Add from "./MachineAdd";

import { variables } from "./MachineVariables";

const List = () => {
  const [data, setData] = useState([]);

  const [formData, setFormData] = useState({ ...variables.create });
  const [editId, setEditedId] = useState();
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [operators, setOperators] = useState([]);
  const [reset, setReset] = useState(null);

  const dataTableColumns = [
    // ...variables.columns,
    {
      name: "Company",
      selector: (row) => row.companyId,
      sortable: true,
      cell: (row) => (
        <span>
          {((row) => {
            let name = "";
            let temp = companies.filter((company) => company.companyId === row.companyId);
            if (temp.length > 0) {
              name = temp[0].name;
            }
            return name;
          })(row)}
        </span>
      ),
    },
    {
      name: "Machine Code",
      selector: (row) => row.machineCode,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.machineName,
      sortable: true,
    },
    {
      name: "Total Slots",
      selector: (row) => row.totalSlots,
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) => (row.machineConfiguration ? row.machineConfiguration.location : ""),
    },
    {
      name: "Operator",
      selector: (row) => (row.machineConfiguration ? row.machineConfiguration.operatorName : ""),
    },
    {
      name: "Payment Options",
      selector: (row) => row.machineConfiguration,
      cell: (row) => {
        let pay_text = "";
        let pay_array = [];
        let mc = row.machineConfiguration;

        if (mc) {
          if (mc.isCash) {
            pay_array.push("Cash");
          }
          if (mc.isVendingPay) {
            pay_array.push("Vending Pay");
          }
          if (mc.isVisaQR) {
            pay_array.push("Visa QR");
          }
          if (mc.isMasterQR) {
            pay_array.push("Master QR");
          }
          if (mc.isPOS_ECR) {
            pay_array.push("POS ECR");
          }
        }

        pay_text = pay_array.join(", ");

        return <span>{pay_text}</span>;
      },
    },
    {
      name: "Actions",
      selector: (row) => row[variables.id],
      style: { textAlign: "right" },
      cell: (row) => (
        <div>
          <div className="tb-odr-btns d-md-inline">
            <UncontrolledDropdown>
              <DropdownToggle
                tag="a"
                className="dropdown-toggle btn btn-icon btn-trigger"
                onClick={(ev) => {
                  ev.preventDefault();
                  onEditClick(row[variables.id]);
                  toggle("details");
                }}
              >
                <Icon name="eye" style={{ fontSize: "20px", cursor: "pointer" }}></Icon>
              </DropdownToggle>
            </UncontrolledDropdown>
          </div>
          <UncontrolledDropdown>
            <DropdownToggle
              tag="a"
              onClick={(ev) => ev.preventDefault()}
              className="dropdown-toggle btn btn-icon btn-trigger"
            >
              <Icon name="more-h"></Icon>
            </DropdownToggle>
            <DropdownMenu end>
              <ul className="link-list-opt no-bdr">
                <li>
                  <DropdownItem
                    tag="a"
                    onClick={(ev) => {
                      ev.preventDefault();
                      onEditClick(row[variables.id]);
                      toggle("edit");
                    }}
                  >
                    <Icon name="edit"></Icon>
                    <span>Edit {variables.name}</span>
                  </DropdownItem>
                </li>
                <li>
                  <DropdownItem
                    tag="a"
                    onClick={(ev) => {
                      ev.preventDefault();
                      deleteItem(row[variables.id]);
                    }}
                  >
                    <Icon name="trash"></Icon>
                    <span>Remove {variables.name}</span>
                  </DropdownItem>
                </li>
              </ul>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      ),
    },
  ];

  useEffect(() => {
    setLoading(true);

    api.get("/company").then((res_s) => {
      setCompanies(res_s.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setLoading(true);

    api.get("/users").then((res_s) => {
      let users = res_s.data;
      let ops = [];
      for (let u of users) {
        if (u.role === "Operator") {
          ops.push(u);
        }
      }
      setOperators(ops);
      setLoading(false);
    });
  }, []);

  const [view, setView] = useState({
    edit: false,
    add: false,
    details: false,
  });

  useEffect(() => {
    setLoading(true);
    api.get(variables.api.index).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, []);

  // function to close the form modal
  const onFormCancel = () => {
    setView({ edit: false, add: false, details: false });
    resetForm();
  };

  const resetForm = () => {
    setFormData(structuredClone(variables.create));
    reset({});
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
    setView({ add: false, edit: true });
  };

  const deleteItem = (id) => {
    deleteConfirmation().then(() => {
      let defaultData = data;
      api
        .delete(variables.api.delete.replace("{id}", id))
        .then((res) => {
          defaultData = defaultData.filter((item) => item[variables.id] !== id);
          let index = data.findIndex((item) => item[variables.id] === id);
          setData([...defaultData]);
          showAlert("success", `${variables.name}: "${data[index].machineName}" Successfully Deleted.`);
        })
        .catch((error) => {
          showAlert("error", `Error: ${error.response.statusText}`);
        });
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

  const postFormSubmit = (new_data, edit = false) => {
    resetForm();
    setData([]);
    setData(new_data);
    if (edit) {
      setView({ edit: false, add: false });
    } else {
      setView({ open: false });
    }
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
            <BlockHeadContent>
              <div>
                <Button
                  className="toggle d-md-inline-flex"
                  color="primary"
                  onClick={() => {
                    toggle("add");
                  }}
                >
                  <Icon name="plus"></Icon>
                  <span>Add {variables.name}</span>
                </Button>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block size="lg">
          <PreviewCard>
            <ReactDataTable
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
          data={data}
          formData={formData}
          companies={companies}
          operators={operators}
          view={view}
          onFormCancel={onFormCancel}
          editId={editId}
          setReset={setReset}
          postFormSubmit={postFormSubmit}
        />

        <Show view={view} onFormCancel={onFormCancel} formData={formData} companies={companies} />
        <Add
          view={view}
          operators={operators}
          companies={companies}
          formData={formData}
          setReset={setReset}
          postFormSubmit={postFormSubmit}
        />

        {view.add && <div className="toggle-overlay" onClick={toggle}></div>}
      </Content>
    </React.Fragment>
  );
};

export default List;

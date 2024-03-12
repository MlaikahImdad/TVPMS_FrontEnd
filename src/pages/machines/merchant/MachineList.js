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
  ReactDataTable,
} from "src/components/Component";

import { DropdownItem, UncontrolledDropdown, DropdownMenu, DropdownToggle } from "reactstrap";

// import {DropdownItem, UncontrolledDropdown, DropdownMenu, DropdownToggle } from "reactstrap";
// import { productData } from "./ProductData";
import api from "src/api";
import { useForm } from "react-hook-form";
import { showAlert, deleteConfirmation, getPlural, mergeObjects } from "src/utils/Utils";
import Update from "./MachineEdit";
import Show from "./MachineShow";

import { variables } from "./MachineVariables";

const List = () => {
  const [data, setData] = useState([]);
  const searchableColumns = ["name", "productCode", "productBarCode", "description", "category"];
  const useform = useForm();
  const { reset} = useform;

  const [formData, setFormData] = useState({...variables.create});
  const [editId, setEditedId] = useState();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [companies, setCompanies] = useState([]);

  const [operators, setOperators] = useState([]);
  

  const dataTableColumns = [
    ...variables.columns,

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
          <div className="tb-odr-btns d-none d-md-inline">
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

  // OnChange function to get the input data
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  // function to close the form modal
  const onFormCancel = () => {
    setView({ edit: false, add: false, details: false });
    resetForm();
  };

  const resetForm = () => {
    setFormData(variables.create);
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
          showAlert("success", `${variables.name}: "${data[index].name}" Successfully Deleted.`);
        })
        .catch((error) => {
          showAlert("error", `Error: ${error.response.statusText}`);
        });
    });
  };

  const onEditSubmit = (form) => {
    // console.log(formData)
    let temp = mergeObjects(form, formData)
    
    setUploading(true);
    api
      .put(variables.api.update, temp)
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

          showAlert("success", `${variables.name}: "${res_s.data.machineName}" Successfully Updated.`);
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

  return (
    <React.Fragment>
      <Head title={variables.name + " List"}></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle>{getPlural(variables.name)}</BlockTitle>
            </BlockHeadContent>
            {/* <BlockHeadContent>
              <div >
              <Button
                className="toggle d-none d-md-inline-flex"
                color="primary"
                onClick={() => {
                  toggle("add");
                }}
              >
                <Icon name="plus"></Icon>
                <span>Add {variables.name}</span>
              </Button>
                
              </div>
            </BlockHeadContent> */}
          </BlockBetween>
        </BlockHead>

        <Block size="lg">
          <PreviewCard>
            <ReactDataTable
              loading={loading}
              data={data}
              columns={dataTableColumns}
              searchableColumns={searchableColumns}
              pagination
              actions={variables.actions}
            />
          </PreviewCard>
        </Block>

        <Update
          view={view}
          uploading={uploading}
          onFormCancel={onFormCancel}
          onInputChange={onInputChange}
  
          formData={formData}
          onEditSubmit={onEditSubmit}
          
          useform={useform}
          operators={operators}
        />

        <Show view={view} onFormCancel={onFormCancel} formData={formData} companies={companies} />

        {view.add && <div className="toggle-overlay" onClick={toggle}></div>}
      </Content>
    </React.Fragment>
  );
};

export default List;

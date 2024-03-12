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
  Row,
  Col,
  NSComponent,
} from "src/components/Component";

import { UncontrolledDropdown, DropdownToggle } from "reactstrap";

import api from "src/api";
import { useForm } from "react-hook-form";
import { showAlert, getPlural, beautifyDate } from "src/utils/Utils";
import Update from "./SlotEdit";
import Show from "./SlotShow";

import { variables } from "./SlotVariables";

const List = () => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const { errors, register, handleSubmit, reset } = useForm();

  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState(variables.create);
  const [editId, setEditedId] = useState();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [machines, setMachines] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [refillData, setRefillData] = useState({});

  const [filterText, setFilterText] = useState("");
  const datatableStyles = [
    {
      when: (row) => !row.isActive,
      style: {
        background: "rgba(255, 106, 106, 0.6)",
      },
    },
    {
      when: (row) => row.isActive,
      style: {
        background: "white",
      },
    },
  ];
  const dataTableColumns = [
    ...variables.columns,
    {
      name: "Refill",
      selector: (row) => row[variables.id],
      minWidth: "160px",
      cell: (row) => (
        <div>
          {row.productName && (
            <NSComponent
              color="light"
              data-slot={row["slotId"]}
              min={-(row.totalRefillCount - row.totalProducttransactionCount)}
              max={row.capacity - (row.totalRefillCount - row.totalProducttransactionCount)}
              defaultVal={0}
              outline
              onChange={changeRefill}
            />
          )}
        </div>
      ),
    },
    {
      name: "Count",
      selector: (row) => row[variables.id],
      style: {
        color: "blue"
      },
      cell: (row) => (
        <span>
          <b>{row.totalRefillCount - row.totalProducttransactionCount}</b>
        </span>
      ),
    },
    {
      name: "Actions",
      selector: (row) => row[variables.id],
      minWidth: "auto",
      cell: (row) => (
        <div style={{ display: "flex", alignItems: "center", flexDirection: "row", width: "125px" }}>
          <div className="custom-control-sm custom-switch" style={{ marginLeft: "5px" }}>
            <input
              type="checkbox"
              className="custom-control-input"
              data-slot={row["slotId"]}
              defaultChecked={row.isActive}
              id={"slot" + row["slotId"]}
              onChange={activateSlot}
            />
            <label className="custom-control-label" htmlFor={"slot" + row["slotId"]}>
              {" "}
            </label>
          </div>
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
          <UncontrolledDropdown>
            <DropdownToggle
              tag="a"
              onClick={(ev) => {
                ev.preventDefault();
                onEditClick(row[variables.id]);
                toggle("edit");
              }}
              className="dropdown-toggle btn btn-icon btn-trigger"
            >
              <Icon name="edit" style={{ fontSize: "20px", cursor: "pointer" }}></Icon>
            </DropdownToggle>
          </UncontrolledDropdown>
        </div>
      ),
    },
    {
      name: "Placed On",
      selector: (row) => beautifyDate(row["productPlacedon"]),
      minWidth: "200px"
    },
  ];

  const activateSlot = (e) => {
    let slot_id = e.target.getAttribute("data-slot");
    api
      .put(variables.api.activateSlot + `?SlotId=${slot_id}&status=${e.target.checked}`)
      .then((res) => {
        let temp_data = [];
        for (let td of data) {
          if (td.slotId === parseInt(slot_id)) {
            td["isActive"] = e.target.checked;
          }
          temp_data.push(td);
        }
        setData(temp_data);

        if (e.target.checked) {
          showAlert("success", "Slot Activated");
        } else {
          showAlert("success", "Slot Deactivated");
        }
      })
      .catch((err) => {
        showAlert("error", `Error: ${err.statusText}`);
      });
  };

  const changeRefill = (e, value) => {
    refillData[e.getAttribute("data-slot")] = value;
    setRefillData(refillData);
  };

  const saveRefill = () => {
    let array = [];
    for (let key of Object.keys(refillData)) {
      let machineId, productCode, slotNo;
      for (let slot of data) {
        if (slot.slotId === parseInt(key)) {
          // machineId = slot.machineCode;
          machineId = machines.find((obj) => {
            return obj.machineCode === slot.machineCode;
          }).id;
          productCode = slot.productCode;
          slotNo = slot.slotNo;
        }
      }

      if (productCode !== 0) {
        array.push({
          machineId: machineId,
          productCode: productCode,
          slotId: key,
          slotNo: slotNo,
          refillQuantity: refillData[key],
        });
      }
    }

    if (array.length > 0) {
      setUploading(true);
      api
        .post(variables.api.refill, array)
        .then((res) => {
          setUploading(false);
          showAlert("success", `Slots Successfully Refilled.`);
          renderSlots(selectedMachine, machines);
          setRefillData({})
        })
        .catch((err) => {
          setUploading(false);
          showAlert("error", `Error: ${err.response.statusText}`);
        });
    }
  };

  const [view, setView] = useState({
    edit: false,
    add: false,
    details: false,
  });

  useEffect(() => {
    api.get(variables.api.machines).then((res) => {
      setMachines(res.data);
    });

    api.get(variables.api.products).then((res) => {
      setProducts(res.data);
    });
  }, []);

  useEffect(() => {
    renderSlots(selectedMachine, machines);
  }, [selectedMachine, machines]);

  const renderSlots = (selectedMachine, machines) => {
    setLoading(true);
    let machineId = null;
    if (selectedMachine === null && machines.length > 0) {
      machineId = machines[0].id;
    } else {
      machineId = selectedMachine;
    }
    if (machineId !== null) {
      api.get(variables.api.index.replace("{Machineid}", machineId)).then((res) => {
        setData(res.data);
        setLoading(false);
      });
    }
  };

  const productFilterChange = (e) => {
    setFilterText(e.target.value);
  };

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
      .put(variables.api.update, {
        capacity: form["capacity"],
        salePrice: form["salePrice"],
        productId: form["productCode"],
        slotId: editId,
      })
      .then((res) => {
        renderSlots(selectedMachine, machines);
        resetForm();
        setUploading(false);
        setView({ edit: false, add: false });

        showAlert("success", `${variables.name} Successfully Updated.`);
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

  // const machineChange = (e) => {
  //   console.log("Machine change",e.target.value)

  //   api.get("/ProductSlot/GetMachineSlots")
  // }

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
          <Col size="6">
            <div className="form-group">
              <label className="form-label" htmlFor="machineId">
                Select Machine
              </label>
              <div className="form-control-wrap">
                <div className="form-control-select">
                  <select
                    className="form-control form-select"
                    id="machineId"
                    name="machineId"
                    placeholder="Select an option"
                    onChange={(e) => setSelectedMachine(e.target.value)}
                  >
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

          <Col size="6">
            <div className="form-group">
              <label className="form-label" htmlFor="productId">
                Filter Slots by Product
              </label>
              <div className="form-control-wrap">
                <div className="form-control-select">
                  <select
                    // ref={props.register()}
                    className="form-control form-select"
                    id="productId"
                    name="productId"
                    placeholder="Select an option"
                    defaultValue={formData.companyId}
                    onChange={productFilterChange}
                  >
                    <option label="Select a prduct" value=""></option>
                    {products.map((prod, key) => {
                      return (
                        <option value={prod.productCode} key={key}>
                          {prod.productCode} - {prod.name}
                        </option>
                      );
                    })}
                    {/* {props.companies.map((company,key) => {
                      return <option value={company.companyId} key={key}>{company.name}</option>
                    })} */}
                  </select>
                </div>
              </div>
            </div>
          </Col>

          <Col size="12" style={{ textAlign: "right", marginBottom: "15px" }}>
            <Button color="primary" loading={uploading} type="submit" onClick={saveRefill}>
              <span>Refill Slots</span>
            </Button>
          </Col>
        </Row>

        <Block size="lg">
          <PreviewCard>
            <ReactDataTable
              loading={loading}
              data={data}
              columns={dataTableColumns}
              searchableColumns={variables.searchableColumns}
              actions={variables.actions}
              filterText={filterText}
              filterCol="productCode"
              conditionalRowStyles={datatableStyles}
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
          products={products}
        />

        <Show view={view} onFormCancel={onFormCancel} formData={formData} products={products} />

        {view.add && <div className="toggle-overlay" onClick={toggle}></div>}
      </Content>
    </React.Fragment>
  );
};

export default List;

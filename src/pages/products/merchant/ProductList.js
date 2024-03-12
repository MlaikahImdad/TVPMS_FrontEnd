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
import { useForm } from "react-hook-form";
import { showAlert, deleteConfirmation, getPlural, getUserCompanyId } from "src/utils/Utils";
import Update from "./ProductEdit";
import Show from "./ProductShow";
import Add from "./ProductAdd";

import { variables } from "./ProductVariables";

const List = () => {
  const [data, setData] = useState([]);
  const [productCatalog, setProductCatalog] = useState([]);
  const { errors, register, handleSubmit, reset } = useForm();

  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState(variables.create);
  const [editId, setEditedId] = useState();
  const [loading, setLoading] = useState(true);
  const [dropzoneError, setDropzoneError] = useState(false);
  const [uploading, setUploading] = useState(false);

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

  const [view, setView] = useState({
    edit: false,
    add: false,
    details: false,
  });

  useEffect(() => {
    setLoading(true);
    
      api.get(variables.api.index).then((ress) => {
    
        setData(ress.data);
        
        updateProductCatalog(ress.data);
        setLoading(false);
      });

  }, []);


  const updateProductCatalog = (tableData) => {
    let productCodes = []
    productCodes = tableData.map((t) => t.productCode)
    
    api.get(variables.api.productCatalog).then(res => {
      let productCatalog = []
      for(let item of res.data){
        if (!productCodes.includes(item.productCode)){
          productCatalog.push(item)
        }
      }
      setProductCatalog(productCatalog)
    })
    
  }

  

  const addProducts = (products) => {
    let fd_array = [];
    for (let product of products) {
      let fd = {};
      fd["productCode"] = product["productCode"];
      fd["newDescription"] = product["newDescription"];
      fd["companyId"] = getUserCompanyId();
      fd_array.push(fd);
    }
    if (fd_array.length > 0) {
      setUploading(true);
      api.post(variables.api.create, fd_array).then((res) => {
        api.get(variables.api.index).then((ress) => {
          setData(ress.data);
          setView({ open: false });
          showAlert("success", "Products Successfully Saved.");
          setUploading(false);
          updateProductCatalog(ress.data)
  
        })
      });
    }
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
    setDropzoneError(false);
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
          updateProductCatalog(defaultData)
        })
        .catch((error) => {
          showAlert("error", `Error: ${error.response.statusText}`);
        });
    });
  };

  const onEditSubmit = (form) => {
    let submitData = {
      productCode: formData.productCode,
      companyId: getUserCompanyId(),
      newDescription: formData.newDescription
    }

    setUploading(true)
    api.put(variables.api.update,[submitData]).then(res => {
      api.get(variables.api.index).then((ress) => {
        console.log(ress.data)
        setData(ress.data);
        resetForm();
        setUploading(false);
        setView({ edit: false, add: false });
        showAlert("success",`${variables.name}: "${ress.data.name}" Successfully Updated.`)

      })
      // // console.log(res.data)
      // api.get(variables.api.show.replace("{id}",editId)).then(res_s => {
      //   // console.log(res_s.data)
      //   let newItems = data;
      //   let index = newItems.findIndex((item) => item[variables.id] === editId);
      //   newItems[index] = res_s.data;
      //   setData([])
      //   setData(newItems);
      //   resetForm();
      //   setUploading(false);
      //   setView({ edit: false, add: false });
      //   showAlert("success",`${variables.name}: "${res_s.data.name}" Successfully Updated.`)
      // })
    })
    .catch((error) => {
      setUploading(false)
      showAlert("error",`Error: ${error.response.statusText}`)
    })
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
            <BlockHeadContent>
              <div>
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
        {/* <PrettyTable data={data} columns={dataTableColumns} selectable={true}/> */}

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

        <Show view={view} onFormCancel={onFormCancel} formData={formData} />
        <Add
          addProducts={addProducts}
          productCatalog={productCatalog}
          view={view}
          uploading={uploading}
          dropzoneError={dropzoneError}
          handleSubmit={handleSubmit}
          onFormCancel={onFormCancel}
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

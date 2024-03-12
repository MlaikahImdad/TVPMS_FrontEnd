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
import api from "src/api"
import { useForm } from "react-hook-form";
import { showAlert, deleteConfirmation, getPlural } from "src/utils/Utils";
import Update from "./ProductEdit";
import Show from "./ProductShow";
import Add from "./ProductAdd";

import { variables } from "./ProductVariables";

const List = () => {

  const [data, setData] = useState([]);
  const { errors, register, handleSubmit, reset } = useForm();
  
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState(variables.create);
  const [editId, setEditedId] = useState();
  const [loading, setLoading] = useState(true)
  const [dropzoneError, setDropzoneError] = useState(false)
  const [uploading, setUploading] = useState(false)


  const dataTableColumns = [
    ...variables.columns,
    {
      name: "Actions",
      selector: (row) => row[variables.id],
      style: {textAlign: "right"},
      cell: (row) => (
        <div >
          <div className="tb-odr-btns d-none d-md-inline">
            {/* <Button color="primary" className="btn-sm"
              onClick={(ev) => {
                ev.preventDefault();
                onEditClick(row[variables.id]);
                toggle("details");
              }}
            >
              View
            </Button> */}
            {/* <Button className="btn-dim" color="primary">Primary</Button> */}
            
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
                <Icon name="eye" style={{fontSize:"20px",cursor: "pointer"}} ></Icon>
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
      )
    },
    
  ];
  
  const [view, setView] = useState({
    edit: false,
    add: false,
    details: false,
  });
  
  
  

  useEffect(() => {
    setLoading(true);
    api.get(variables.api.index).then(res => {
      setData(res.data);
      setLoading(false);
    })
  },[])

  

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
  

  const getFormData = (form,id=null) => {
    let submittedData = {}
      for (let key in variables.create){
        submittedData[key] = form[key]
      }
      if (id){
        submittedData[variables.id] = id
      }
      let fd = new FormData()
      for (let key in submittedData) {
        fd.append(key, submittedData[key]);
      }
      if (files.length > 0) {
        fd.append("productImage",files[0])
      }
      return fd
  }

  const onFormSubmit = (form) => {
    if (files.length > 0) {
      setUploading(true)

      api.post(variables.api.create,getFormData(form)).then(res => {
        api.get(variables.api.index).then(res => {
          resetForm();
          setUploading(false)
          setData(res.data);
          
          setView({ open: false });
          setFiles([]);
          showAlert("success",variables.name+" Successfully Saved.")
        })
      })
      .catch((error) => {
        setUploading(false)
        showAlert("error",`Error: ${error.response.statusText}`)
      })
    }
    else{
      setDropzoneError(true)
    }
  };

  const onEditClick = (id) => {
    data.forEach((item) => {
      if (item[variables.id] === id) {
        let temp = {}
        for (let key in variables.create){
          temp[key] = item[key]
        }
        temp[variables.id] = item[variables.id]
        setFormData(temp)
      }
    });

    setEditedId(id);
    setFiles([]);
    setView({ add: false, edit: true });
  };

  const deleteItem = (id) => {
    deleteConfirmation().then(() => {
      let defaultData = data;
      api.delete(variables.api.delete.replace("{id}",id)).then(res => {
        defaultData = defaultData.filter((item) => item[variables.id] !== id);
        let index = data.findIndex((item) => item[variables.id] === id);
        setData([...defaultData]);
        showAlert("success",`${variables.name}: "${data[index].name}" Successfully Deleted.`)
      })
      .catch((error) => {
        showAlert("error",`Error: ${error.response.statusText}`)
      })
    });
    
  };

  const onEditSubmit = (form) => {
    setUploading(true)

    api.put(variables.api.update,getFormData(form,editId)).then(res => {
      // console.log(res.data)
      api.get(variables.api.show.replace("{id}",editId)).then(res_s => {
        // console.log(res_s.data)
        let newItems = data;
        let index = newItems.findIndex((item) => item[variables.id] === editId);
        newItems[index] = res_s.data;
        setData([])
        setData(newItems);
        resetForm();
        setUploading(false);
        setView({ edit: false, add: false });


        showAlert("success",`${variables.name}: "${res_s.data.name}" Successfully Updated.`)

      })
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
      
                  
      <Head title={variables.name+" List"}></Head>
      <Content>
        
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle>{getPlural(variables.name)}</BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
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
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        
        
                  
        
        <Block size="lg">
          <PreviewCard>
            <ReactDataTable loading={loading} data={data} columns={dataTableColumns} searchableColumns={variables.searchableColumns} pagination actions={variables.actions} />
          </PreviewCard>
        </Block>

        <Update view={view} uploading={uploading} onFormCancel={onFormCancel} handleSubmit={handleSubmit} onInputChange={onInputChange} register={register} formData={formData} errors={errors} onEditSubmit={onEditSubmit} onCategoryChange={onCategoryChange} handleDropChange={handleDropChange} files={files}/>
        
        <Show view={view} onFormCancel={onFormCancel} formData={formData}/>
        <Add view={view} uploading={uploading} dropzoneError={dropzoneError} handleSubmit={handleSubmit} onFormCancel={onFormCancel} onFormSubmit={onFormSubmit} onInputChange={onInputChange} register={register} formData={formData} errors={errors}  onCategoryChange={onCategoryChange} handleDropChange={handleDropChange} files={files}/>


        {view.add && <div className="toggle-overlay" onClick={toggle}></div>}
      </Content>
    </React.Fragment>
  );
};

export default List;

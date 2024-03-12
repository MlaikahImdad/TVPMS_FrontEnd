import React, {useState,useEffect} from "react";

import {
  Block,
  PaginationComponent,
  PreviewAltCard,
  DataTableHead,
  DataTableRow,
  DataTableItem,
} from "src/components/Component";





const PrettyTable = ({selectable,primaryKey,columns,data,paginate, searchText, searchableColumns, height, setCheckedItems}) => {
    
    const [tableData, setTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage] = useState(paginate);
    const [currentItems, setCurrentItems] = useState([]);
    
    // Get current list, pagination


    
    useEffect(() => {
        let tempData = []
        for (let t of data){
          t.checked = false
          tempData.push(t)
        }
        setTableData(tempData);
        // let indexOfLastItem = currentPage * itemPerPage;
        // let indexOfFirstItem = indexOfLastItem - itemPerPage;
        // setCurrentItems(data.slice(indexOfFirstItem, indexOfLastItem));
        setCurrentItems(tempData)
     },[data,currentPage,itemPerPage])

     useEffect(() => {

        if (searchableColumns){
          let defaultData = tableData;
          if (searchText !== "") {
            defaultData = defaultData.filter((item) => {
              let result = null
              for (let col of searchableColumns) {
                if (result){
                  result = result || item[col].toLowerCase().includes(searchText.toLowerCase())
                }
                else{
                  result = item[col].toLowerCase().includes(searchText.toLowerCase())
                }
              }
              return result
              // return item.name.toLowerCase().includes(searchText.toLowerCase());
            });
            setCurrentItems(defaultData);
          } else {
            setCurrentItems(tableData);
          }
        }else{
          setCurrentItems(tableData)
        }
      }, [searchText,searchableColumns,tableData]);


    const selectorCheck = (e) => {
        // let newData;
        // newData = tableData.map((item) => {
        //   item.checked = e.currentTarget.checked;
        //   return item;
        // });
        // console.log("selectCheck", newData);
        // setCheckedItems([...newData]);

        if (e.target.checked){
          for (let item of tableData){
            let ele = document.getElementById(item[primaryKey]+"pid-all")
            if (!ele.checked){
              ele.click()
              // ele.checked = true
            }
            // onSelectChange(ele,item[primaryKey])
          }
        }else{
          for (let item of tableData){
            let ele = document.getElementById(item[primaryKey]+"pid-all")
            if (ele.checked){
              ele.click()
              // ele.checked = false
            }
        }
      }
    };

    const onSelectChange = (e, id) => {
        let newData = tableData;
        let index = newData.findIndex((item) => item[primaryKey] === id);
        newData[index].checked = e.target.checked;
        setTableData(newData)
        let selectedItems = []
        for (let item of tableData) {
          if (item.checked){
            selectedItems.push(item)
          }
        }
        // console.log("onSelectChange", selectedItems);
        setCheckedItems([...selectedItems]);
    };
    
    return (
        <Block style={{height:height,overflow:"scroll"}}>
          <div className="nk-tb-list is-separate nk-tb-ulist">
            <DataTableHead className="nk-tb-item nk-tb-head">
                {selectable && 
                    <DataTableRow className="nk-tb-col-check">
                        <div className="custom-control custom-control-sm custom-checkbox notext">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="pid-all"
                            onChange={(e) => selectorCheck(e)}
                        />
                        <label className="custom-control-label" htmlFor="pid-all"></label>
                        </div>
                    </DataTableRow>
                }

                {
                    columns.map((column, i) => (
                        <DataTableRow size={column.size} key={i}>
                            <span className="fw-bold" style={column.style}>{column.name}</span>
                        </DataTableRow>
                    ))
                }
              
            </DataTableHead>
            {currentItems.length > 0
              ? currentItems.map((item,id) => {
                  return (
                    <DataTableItem key={id}>
                        {selectable &&
                            <DataTableRow className="nk-tb-col-check">
                                <div className="custom-control custom-control-sm custom-checkbox notext">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    defaultChecked={item.checked}
                                    id={item[primaryKey] + "pid-all"}
                                    key={id}
                                    onChange={(e) => onSelectChange(e, item[primaryKey])}
                                />
                                <label className="custom-control-label" htmlFor={item[primaryKey] + "pid-all"}></label>
                                </div>
                            </DataTableRow>
                        }

                        {
                            columns.map((column,i) => {
                                if (column.cell){
                                    return (
                                        <DataTableRow size={column.size} key={i}>
                                            {column.cell(item)}
                                        </DataTableRow>
                                    )
                                }
                                else{
                                    return (
                                        <DataTableRow  size={column.size} key={i}>
                                            <span>{column.selector(item)}</span>
                                        </DataTableRow>
                                    )
                                }
                            })
                        }
                    </DataTableItem>
                  );
                })
              : null}
          </div>
          <PreviewAltCard>
            
            {(tableData.length > 0 && paginate) && 
                <PaginationComponent
                  itemPerPage={itemPerPage}
                  totalItems={tableData.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
            }
            {(currentItems.length < 1) &&
              <div className="text-center">
                <span className="text-silent">No Records found</span>
              </div>
            }
          </PreviewAltCard>
        </Block>
    )
}

export default PrettyTable;
import { beautifyDate } from "src/utils/Utils";

export const variables = {
    name: "Product Transaction",
    id: "id",
    searchableColumns: ["saleNo"],
    actions: true,
    create: {
      companyId: 0,
      machineId: 0,
      saleNo: "",
      slotId: 0,
      productCode: "",
      productPrice: 0,
      dispenseStatus: "Success",
      transactionDateTime: "2023-12-20T16:04:29.1880687",
      id: 0,
      productBarCode: "",
      name: "",
      description: "",
      category: "",
      productImage: "",
      newDescription: "",
      modifiedBy: 0,
      modifiedDate: "1990-01-01T00:00:00",
      isDeleted: false,
      deletedBy: 0,
      deletedDate: "1990-01-01T00:00:00",
      createdBy: 0,
      createdDate: "2023-12-21T01:34:40.6003923-05:00"
    },
    
    api: {
        index: "/SalesTransaction/GetProductTransaction",
        machines: "/Machine",
        products: "/productCatalog"
    },
    columns: [
        {
          name: "Sale No",
          selector: (row) => row.saleNo,
          sortable: true,
          minWidth: "150px"
        },
        {
          name: "Product Code",
          selector: (row) => row.productCode,
          sortable: true,
          minWidth: "175px"
        },
        {
          name: "Product Name",
          selector: (row) => row.name,
          sortable: true,
          minWidth: "125px"

        },
        {
          name: "Sale Price",
          selector: (row) => row.productPrice,
          sortable: true,
        },        
        {
          name: "Status",
          selector: (row) => row.dispenseStatus,
          sortable: true,
          minWidth: "125px"

        },        
        {
          name: "Date",
          grow: 3,
          selector: (row) => beautifyDate(row.transactionDateTime),
          sortable: true,
        },        
      ]

}
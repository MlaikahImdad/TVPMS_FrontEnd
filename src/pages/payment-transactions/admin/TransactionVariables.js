import { beautifyDate } from "src/utils/Utils";

export const variables = {
    name: "Payment Transaction",
    id: "id",
    searchableColumns: ["saleNo"],
    actions: true,
    create: {
      "companyId": 0,
      "machineId": 0,
      "id": 0,
      "saleNo": "",
      "paymentMethod": "",
      "transactionAmount": 0,
      "paymentDirection": "",
      "paymentInfo": "",
      "readDateTime": "0"
    },
    
    api: {
        index: "/SalesTransaction/GetPaymentTransaction",
        machines: "/Machine",
        companies: "/company"
    },
    columns: [
        {
          name: "Sale No",
          selector: (row) => row.saleNo,
          sortable: true,
          minWidth: "125px",
          maxWidth: "150px"
        },
        {
          name: "Payment Type",
          selector: (row) => row.paymentMethod,
          sortable: true,
          maxWidth: "175px"
        },
        {
          name: "Amount",
          selector: (row) => row.transactionAmount,
          sortable: true,
        },        
        {
          name: "Direction",
          selector: (row) => row.paymentDirection,
          sortable: true,
          maxWidth: "75px"

        },
        {
          name: "Info",
          selector: (row) => row.paymentInfo,
          sortable: true,
          maxWidth: "125px"

        },        
        {
          name: "Date",
          grow: 3,
          selector: (row) => beautifyDate(row.readDateTime),
          sortable: true,

        },        
      ]

}
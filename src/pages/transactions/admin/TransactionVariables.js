import { beautifyDate } from "src/utils/Utils";

export const variables = {
  name: "Transaction",
  id: "id",
  searchableColumns: [
    "saleNo"
  ],
  actions: true,
  create: {},

  api: {
    index: "/SalesTransaction",
    machines: "/Machine",
    companies: "/company",
  },
  columns: [
    {
      name: "Sale No",
      selector: (row) => row.saleNo,
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Machine Code",
      selector: (row) => row.machineCode,
      sortable: true,
      minWidth: "175px",
    },
    {
      name: "Purchase",
      selector: (row) => row.purchaseAmount,
      sortable: true,
      minWidth: "125px",
    },
    {
      name: "Paid",
      selector: (row) => row.paidAmount,
      sortable: true,
    },
    {
      name: "Balance",
      selector: (row) => row.balanceAmount,
      sortable: true,
      minWidth: "125px",
    },
    {
      name: "Sale Date",
      grow: 3,
      selector: (row) => beautifyDate(row.saleDate),
      sortable: true,
    },
  ],
};

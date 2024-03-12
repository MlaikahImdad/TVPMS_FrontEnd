export const variables = {
  name: "Machine",
  id: "id",
  searchableColumns: ["machineID", "machineName", "totalSlots", "remarks"],
  actions: false,
  create: {
    id: 0,
    companyId: "",
    machineCode: "",
    machineName: "",
    totalSlots: 0,
    macAddress: "",
    remarks: "",
    helpLineNumber: "",
    machineConfiguration: {
      id: 0,
      machineCode: "",
      location: "",
      operatorId: 0,
      operatorName: "",
      machinePassword: "",
      isCash: false,

      isVendingPay: false,
      vendingPay_PAN: "",
      vendingPay_ChargesPercentage: 0,

      isVisaQR: false,
      visaQR_PAN: "",
      visaQR_ChargesPercentage: 0,

      isMasterQR: false,
      masterQR_PAN: "",
      masterQR_ChargesPercentage: 0,

      isPOS_ECR: false,
      poS_ECR_Id: "",
      poS_ChargesPercentage: 0,

      installedBy: 1,
      installedDate: "0001-01-01T00:00:00",
    },
  },

  api: {
    index: "/Machine",
    create: "/Machine",
    update: "/Machine",
    show: "/Machine/{id}",
    delete: "/Machine/{id}",
  },
  columns: [
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
      selector: (row) => row.operator,
    },
  ],
};
